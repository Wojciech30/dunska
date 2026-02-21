const express = require('express');
const router = express.Router();
const SiteSettings = require('../models/SiteSettings');
const adminAuth = require('../middleware/auth');

// PUBLIC — Get site settings
router.get('/', async (req, res) => {
  try {
    const settings = await SiteSettings.getSettings();
    res.json(settings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ADMIN — Verify password (login)
router.post('/admin/login', (req, res) => {
  const { password } = req.body;
  if (password === process.env.ADMIN_PASSWORD) {
    res.json({ success: true });
  } else {
    res.status(401).json({ error: 'Nieprawidłowe hasło' });
  }
});

// ADMIN — Update settings
router.put('/admin', adminAuth, async (req, res) => {
  try {
    let settings = await SiteSettings.getSettings();
    Object.assign(settings, req.body);
    await settings.save();
    res.json(settings);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
