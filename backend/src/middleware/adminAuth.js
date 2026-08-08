// Lightweight admin-key protection for routes only the site owner should access.
// Set ADMIN_KEY in .env and send it as the "x-admin-key" header.
export function requireAdminKey(req, res, next) {
  const key = req.headers["x-admin-key"];

  if (!process.env.ADMIN_KEY) {
    return res.status(503).json({ error: "Admin access is not configured on this server." });
  }

  if (!key || key !== process.env.ADMIN_KEY) {
    return res.status(401).json({ error: "Unauthorized." });
  }

  next();
}
