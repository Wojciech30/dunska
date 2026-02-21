/**
 * Simple password-based admin auth middleware.
 * Checks x-admin-password header against ADMIN_PASSWORD env var.
 */
module.exports = function adminAuth(req, res, next) {
  const password = req.headers['x-admin-password'];

  if (!password || password !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  next();
};
