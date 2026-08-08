import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import contactRoutes from "./routes/contact.js";

export function createApp() {
  const app = express();

  const allowedOrigins = (process.env.CLIENT_ORIGIN || "http://localhost:5173").split(",");

  app.use(helmet());
  // app.use(
  //   cors({
  //     origin: (origin, callback) => {
  //       if (!origin || allowedOrigins.includes(origin)) {
  //         callback(null, true);
  //       } else {
  //         callback(new Error("Not allowed by CORS"));
  //       }
  //     },
  //   })
  // );
  app.use(cors());
  app.use(express.json({ limit: "10kb" }));
  if (process.env.NODE_ENV !== "test") app.use(morgan("dev"));

  app.get("/", (req, res) => {
    res.json({ status: "ok", service: "portfolio-backend" });
  });

  app.get("/api/health", (req, res) => {
    res.json({ status: "healthy", timestamp: new Date().toISOString() });
  });

  app.use("/api/contact", contactRoutes);

  app.use((req, res) => {
    res.status(404).json({ error: "Route not found." });
  });

  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({ error: err.message || "Internal server error." });
  });

  return app;
}
