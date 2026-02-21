const express = require('express');
const router = express.Router();
const Brand = require('../models/Brand');
const adminAuth = require('../middleware/auth');

// PUBLIC — Get all brands
router.get('/', async (req, res) => {
  try {
    const brands = await Brand.find().sort({ order: 1, name: 1 });
    res.json(brands);
  } catch (err) {
    res.status(500).json({ error: err.message });
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
    const brand = new Brand(req.body);
    await brand.save();
    res.status(201).json(brand);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ADMIN — Update brand
router.put('/admin/:id', adminAuth, async (req, res) => {
  try {
    const brand = await Brand.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!brand) return res.status(404).json({ error: 'Brand not found' });
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
    res.json({ message: 'Brand deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
