import "dotenv/config";
import { createApp } from "../src/app.js";
import { connectDB } from "../src/config/db.js";

await connectDB();

const app = createApp();

export default app;