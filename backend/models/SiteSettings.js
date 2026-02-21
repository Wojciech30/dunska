const mongoose = require("mongoose");

const siteSettingsSchema = new mongoose.Schema(
  {
    // Hero section
    heroImage: { type: String, default: "" },
    heroClaim: {
      type: String,
      default: "Skandynawski styl. Ponadczasowa elegancja.",
    },

    // About section (short version for homepage)
    aboutPreview: { type: String, default: "" },

    // About page (full content)
    aboutTitle: { type: String, default: "O nas" },
    aboutContent: { type: String, default: "" },
    aboutImage: { type: String, default: "" },

    // Contact
    contactEmail: { type: String, default: "" },
    phone: { type: String, default: "" },
    address: { type: String, default: "" },
    mapUrl: { type: String, default: "" },

    // Social media
    instagramUrl: { type: String, default: "" },
    instagramDmUrl: { type: String, default: "" },
    facebookUrl: { type: String, default: "" },

    // Homepage section ordering
    homepageSections: [
      {
        type: { type: String },
        enabled: { type: Boolean, default: true },
        order: { type: Number, default: 0 },
      },
    ],

    // Footer
    footerText: {
      type: String,
      default: "© Duńska Concept Store. Wszelkie prawa zastrzeżone.",
    },
  },
  { timestamps: true },
);

// Ensure singleton
siteSettingsSchema.statics.getSettings = async function () {
  let settings = await this.findOne();
  if (!settings) {
    settings = await this.create({
      homepageSections: [
        { type: "hero", enabled: true, order: 0 },
        { type: "brands", enabled: true, order: 1 },
        { type: "inspirations", enabled: true, order: 2 },
        { type: "about", enabled: true, order: 3 },
        { type: "cta", enabled: true, order: 4 },
        { type: "blog", enabled: true, order: 5 },
        { type: "social", enabled: true, order: 6 },
      ],
    });
  }
  return settings;
};

module.exports = mongoose.model("SiteSettings", siteSettingsSchema);
