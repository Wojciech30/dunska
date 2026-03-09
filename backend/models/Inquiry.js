const mongoose = require('mongoose');

const inquirySchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  phone: { type: String, default: '' },
  email: { type: String, default: '' },
  brandId: { type: mongoose.Schema.Types.ObjectId, ref: 'Brand', default: null },
  brand: { type: String, default: '' },
  interests: [{ type: String }],
  size: { type: String, default: '' },
  message: { type: String, default: '' },
  consent: { type: Boolean, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Inquiry', inquirySchema);
