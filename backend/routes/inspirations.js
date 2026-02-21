const express = require('express');
const router = express.Router();
const Inspiration = require('../models/Inspiration');
const adminAuth = require('../middleware/auth');

// PUBLIC — Get all inspirations
router.get('/', async (req, res) => {
  try {
    const { brand } = req.query;
    const filter = {};
    if (brand) filter.brand = brand;

    const inspirations = await Inspiration.find(filter)
      .populate('brand', 'name slug')
      .sort({ order: 1 });
    res.json(inspirations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ADMIN — Create inspiration
router.post('/admin', adminAuth, async (req, res) => {
  try {
    const inspiration = new Inspiration(req.body);
    await inspiration.save();
    res.status(201).json(inspiration);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ADMIN — Update inspiration
router.put('/admin/:id', adminAuth, async (req, res) => {
  try {
    const inspiration = await Inspiration.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!inspiration) return res.status(404).json({ error: 'Inspiration not found' });
    res.json(inspiration);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ADMIN — Delete inspiration
router.delete('/admin/:id', adminAuth, async (req, res) => {
  try {
    const inspiration = await Inspiration.findByIdAndDelete(req.params.id);
    if (!inspiration) return res.status(404).json({ error: 'Inspiration not found' });
    res.json({ message: 'Inspiration deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ADMIN — Reorder inspirations
router.put('/admin/reorder', adminAuth, async (req, res) => {
  try {
    const { items } = req.body; // [{ id, order }]
    for (const item of items) {
      await Inspiration.findByIdAndUpdate(item.id, { order: item.order });
    }
    res.json({ message: 'Reordered' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
