const express = require('express');
const router = express.Router();
const Brand = require('../models/Brand');
const adminAuth = require('../middleware/auth');
const { sanitizeHtml } = require('../utils/sanitizeHtml');
const { deleteUnusedLocalUrls } = require('../services/mediaCleanup');

// PUBLIC — Get all brands
router.get('/', async (req, res) => {
  try {
    const brands = await Brand.find().sort({ order: 1, name: 1 });
    res.json(brands);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ADMIN — Get single brand by id
router.get('/admin/:id', adminAuth, async (req, res) => {
  try {
    const brand = await Brand.findById(req.params.id);
    if (!brand) return res.status(404).json({ error: 'Brand not found' });
    res.json(brand);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUBLIC — Get single brand by slug
router.get('/:slug', async (req, res) => {
  try {
    const brand = await Brand.findOne({ slug: req.params.slug });
    if (!brand) return res.status(404).json({ error: 'Brand not found' });
    res.json(brand);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ADMIN — Create brand
router.post('/admin', adminAuth, async (req, res) => {
  try {
    const payload = { ...req.body };
    if (Object.prototype.hasOwnProperty.call(req.body, 'description')) {
      payload.description = sanitizeHtml(req.body.description);
    }
    const brand = new Brand(payload);
    await brand.save();
    res.status(201).json(brand);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ADMIN — Update brand
router.put('/admin/:id', adminAuth, async (req, res) => {
  try {
    const existing = await Brand.findById(req.params.id);
    if (!existing) return res.status(404).json({ error: 'Brand not found' });

    const payload = { ...req.body };
    if (Object.prototype.hasOwnProperty.call(req.body, 'description')) {
      payload.description = sanitizeHtml(req.body.description);
    }
    const brand = await Brand.findByIdAndUpdate(req.params.id, payload, { new: true, runValidators: true });
    if (!brand) return res.status(404).json({ error: 'Brand not found' });

    deleteUnusedLocalUrls(
      [existing.logo, existing.heroImage, ...(existing.gallery || [])],
      { excludeUrls: [brand.logo, brand.heroImage, ...(brand.gallery || [])] },
    ).catch((err) => console.error('brand cleanup error:', err.message));

    res.json(brand);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ADMIN — Delete brand
router.delete('/admin/:id', adminAuth, async (req, res) => {
  try {
    const brand = await Brand.findByIdAndDelete(req.params.id);
    if (!brand) return res.status(404).json({ error: 'Brand not found' });

    deleteUnusedLocalUrls([brand.logo, brand.heroImage, ...(brand.gallery || [])]).catch((err) =>
      console.error('brand cleanup error:', err.message),
    );

    res.json({ message: 'Brand deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
