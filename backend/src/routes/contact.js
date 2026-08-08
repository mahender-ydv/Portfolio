import { Router } from "express";
import { body, validationResult } from "express-validator";
import rateLimit from "express-rate-limit";
import Contact from "../models/Contact.js";
import { requireAdminKey } from "../middleware/adminAuth.js";
import { sendOwnerNotification, sendSenderConfirmation } from "../utils/mailer.js";

const router = Router();

// Limit contact submissions to prevent spam/abuse
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5,
  message: { error: "Too many messages sent. Please try again later." },
  standardHeaders: true,
  legacyHeaders: false,
});

const validateContact = [
  body("name").trim().notEmpty().withMessage("Name is required").isLength({ max: 120 }),
  body("email").trim().isEmail().withMessage("A valid email is required").normalizeEmail(),
  body("message").trim().notEmpty().withMessage("Message is required").isLength({ max: 5000 }),
];

// POST /api/contact - submit a new contact message
router.post("/", contactLimiter, validateContact, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array()[0].msg, details: errors.array() });
  }

  try {
    const { name, email, message } = req.body;
    const contact = await Contact.create({
      name,
      email,
      message,
      ip: req.ip,
    });

    // Email delivery is best-effort: the message is already saved above,
    // so a failed email never costs the visitor's submission.
    try {
      await sendOwnerNotification({ name, email, message });
      await sendSenderConfirmation({ name, email });
    } catch (mailErr) {
      console.error("Email notification failed:", mailErr.message);
    }

    return res.status(201).json({
      success: true,
      message: "Message received. Thanks for reaching out!",
      id: contact._id,
    });
  } catch (err) {
    console.error("Contact submission error:", err.message);
    return res.status(500).json({ error: "Something went wrong. Please try again." });
  }
});

// GET /api/contact - list messages (site owner only, requires x-admin-key header)
router.get("/", requireAdminKey, async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 }).limit(200);
    return res.json({ count: messages.length, messages });
  } catch (err) {
    return res.status(500).json({ error: "Could not fetch messages." });
  }
});

export default router;
