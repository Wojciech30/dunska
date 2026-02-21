const mongoose = require('mongoose');
const slugify = require('slugify');

const blogPostSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  slug: { type: String, unique: true },
  content: { type: String, default: '' },
  excerpt: { type: String, default: '' },
  coverImage: { type: String, default: '' },
  category: { type: String, default: '' },
  brand: { type: mongoose.Schema.Types.ObjectId, ref: 'Brand', default: null },
  metaTitle: { type: String, default: '' },
  metaDescription: { type: String, default: '' },
  published: { type: Boolean, default: false },
}, { timestamps: true });

blogPostSchema.pre('validate', function (next) {
  if (this.title && !this.slug) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  next();
});

module.exports = mongoose.model('BlogPost', blogPostSchema);
