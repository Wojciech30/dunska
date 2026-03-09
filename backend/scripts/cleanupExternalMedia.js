require("dotenv").config({ path: "../../.env" });
const mongoose = require("mongoose");
const Brand = require("../models/Brand");
const BlogPost = require("../models/BlogPost");
const Inspiration = require("../models/Inspiration");
const SiteSettings = require("../models/SiteSettings");

const isExternalUrl = (v) => typeof v === "string" && /^https?:\/\//i.test(v);

async function run() {
  const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/dunska";
  await mongoose.connect(uri);

  let changedBrands = 0;
  const brands = await Brand.find();
  for (const b of brands) {
    let changed = false;
    if (isExternalUrl(b.logo)) {
      b.logo = "";
      changed = true;
    }
    if (isExternalUrl(b.heroImage)) {
      b.heroImage = "";
      changed = true;
    }
    if (Array.isArray(b.gallery)) {
      const next = b.gallery.filter((img) => !isExternalUrl(img));
      if (next.length !== b.gallery.length) {
        b.gallery = next;
        changed = true;
      }
    }
    if (changed) {
      await b.save();
      changedBrands += 1;
    }
  }

  let changedPosts = 0;
  const posts = await BlogPost.find();
  for (const p of posts) {
    if (isExternalUrl(p.coverImage)) {
      p.coverImage = "";
      await p.save();
      changedPosts += 1;
    }
  }

  let removedInspirations = 0;
  const inspirations = await Inspiration.find();
  for (const i of inspirations) {
    if (isExternalUrl(i.image)) {
      await Inspiration.findByIdAndDelete(i._id);
      removedInspirations += 1;
    }
  }

  let changedSettings = 0;
  const settings = await SiteSettings.find();
  for (const s of settings) {
    let changed = false;
    if (isExternalUrl(s.heroImage)) {
      s.heroImage = "";
      changed = true;
    }
    if (isExternalUrl(s.aboutImage)) {
      s.aboutImage = "";
      changed = true;
    }
    if (changed) {
      await s.save();
      changedSettings += 1;
    }
  }

  console.log(
    JSON.stringify(
      {
        changedBrands,
        changedPosts,
        removedInspirations,
        changedSettings,
      },
      null,
      2,
    ),
  );

  await mongoose.disconnect();
}

run().catch(async (err) => {
  console.error(err);
  try {
    await mongoose.disconnect();
  } catch (e) {}
  process.exit(1);
});
