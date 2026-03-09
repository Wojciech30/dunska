const express = require('express');
const router = express.Router();
const SiteSettings = require('../models/SiteSettings');
const adminAuth = require('../middleware/auth');
const { sanitizeHtml } = require('../utils/sanitizeHtml');
const { deleteUnusedLocalUrls } = require('../services/mediaCleanup');

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
    const previousImages = [settings.heroImage, settings.aboutImage];

    const payload = { ...req.body };
    if (Object.prototype.hasOwnProperty.call(req.body, 'aboutContent')) {
      payload.aboutContent = sanitizeHtml(req.body.aboutContent);
    }
    if (Object.prototype.hasOwnProperty.call(req.body, 'aboutPreview')) {
      payload.aboutPreview = sanitizeHtml(req.body.aboutPreview);
    }

    Object.assign(settings, payload);
    await settings.save();

    deleteUnusedLocalUrls(previousImages, {
      excludeUrls: [settings.heroImage, settings.aboutImage],
    }).catch((err) => console.error('settings cleanup error:', err.message));

    res.json(settings);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
