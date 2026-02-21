const mongoose = require('mongoose');
const slugify = require('slugify');

const brandSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  slug: { type: String, unique: true },
  description: { type: String, default: '' },
  logo: { type: String, default: '' },
  heroImage: { type: String, default: '' },
  gallery: [{ type: String }],
  isPremium: { type: Boolean, default: false },
  premiumLabel: { type: String, default: 'Premium selection' },
  order: { type: Number, default: 0 },
  featured: { type: Boolean, default: false },
}, { timestamps: true });

brandSchema.pre('validate', function (next) {
  if (this.name && !this.slug) {
    this.slug = slugify(this.name, { lower: true, strict: true });
  }
  next();
});

module.exports = mongoose.model('Brand', brandSchema);
