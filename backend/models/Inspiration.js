const mongoose = require('mongoose');

const inspirationSchema = new mongoose.Schema({
  image: { type: String, required: true },
  caption: { type: String, default: '' },
  brand: { type: mongoose.Schema.Types.ObjectId, ref: 'Brand', default: null },
  order: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Inspiration', inspirationSchema);
