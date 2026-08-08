import nodemailer from "nodemailer";

let transporter = null;

function getTransporter() {
  if (transporter) return transporter;

  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    return null;
  }

  transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST || "smtp.gmail.com",
    port: Number(process.env.EMAIL_PORT) || 587,
    secure: process.env.EMAIL_SECURE === "true", // true for port 465, false for 587
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  return transporter;
}

// Notify the site owner that a new contact message came in.
export async function sendOwnerNotification({ name, email, message }) {
  const t = getTransporter();
  if (!t) {
    console.warn("Email not configured (EMAIL_USER/EMAIL_PASS missing) — skipping owner notification.");
    return { sent: false, reason: "not_configured" };
  }

  const to = process.env.EMAIL_TO || process.env.EMAIL_USER;

  await t.sendMail({
    from: `"Portfolio Contact Form" <${process.env.EMAIL_USER}>`,
    to,
    replyTo: email,
    subject: `New portfolio message from ${name}`,
    text: `You received a new message from your portfolio contact form.\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    html: `
      <div style="font-family: sans-serif; max-width: 560px;">
        <h2 style="margin-bottom: 4px;">New message from your portfolio</h2>
        <p style="color:#666; margin-top:0;">Sent via the contact form</p>
        <table style="width:100%; border-collapse: collapse; margin: 16px 0;">
          <tr><td style="padding:6px 0; color:#666; width:80px;">Name</td><td style="padding:6px 0;">${name}</td></tr>
          <tr><td style="padding:6px 0; color:#666;">Email</td><td style="padding:6px 0;">${email}</td></tr>
        </table>
        <div style="background:#f5f5f5; border-radius:8px; padding:16px; white-space:pre-wrap;">${message}</div>
        <p style="color:#999; font-size:12px; margin-top:24px;">Reply directly to this email to respond to ${name}.</p>
      </div>
    `,
  });

  return { sent: true };
}

// Optional: send the person who submitted the form a confirmation.
export async function sendSenderConfirmation({ name, email }) {
  const t = getTransporter();
  if (!t) return { sent: false, reason: "not_configured" };

  await t.sendMail({
    from: `"Mahender Yadav" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Thanks for reaching out",
    text: `Hi ${name},\n\nThanks for your message — I've received it and will get back to you soon.\n\n— Mahender`,
    html: `
      <div style="font-family: sans-serif; max-width: 480px;">
        <p>Hi ${name},</p>
        <p>Thanks for reaching out through my portfolio — I've received your message and will get back to you soon.</p>
        <p>— Mahender</p>
      </div>
    `,
  });

  return { sent: true };
}
