const fs = require("fs/promises");
const path = require("path");
const Brand = require("../models/Brand");
const BlogPost = require("../models/BlogPost");
const Inspiration = require("../models/Inspiration");
const SiteSettings = require("../models/SiteSettings");

const uploadsDir = path.join(__dirname, "..", "uploads");

function isLocalUploadUrl(url) {
  return typeof url === "string" && url.startsWith("/uploads/");
}

function collectUrls(value) {
  if (!value) return [];
  if (Array.isArray(value)) return value.filter(Boolean);
  return [value].filter(Boolean);
}

async function getReferencedLocalUrls({ excludeUrls = [] } = {}) {
  const excluded = new Set(excludeUrls.filter(Boolean));
  const referenced = new Set();

  const [brands, posts, inspirations, settings] = await Promise.all([
    Brand.find({}, { logo: 1, heroImage: 1, gallery: 1 }).lean(),
    BlogPost.find({}, { coverImage: 1 }).lean(),
    Inspiration.find({}, { image: 1 }).lean(),
    SiteSettings.find({}, { heroImage: 1, aboutImage: 1 }).lean(),
  ]);

  for (const b of brands) {
    for (const url of [
      ...collectUrls(b.logo),
      ...collectUrls(b.heroImage),
      ...collectUrls(b.gallery),
    ]) {
      if (isLocalUploadUrl(url) && !excluded.has(url)) referenced.add(url);
    }
  }

  for (const p of posts) {
    for (const url of collectUrls(p.coverImage)) {
      if (isLocalUploadUrl(url) && !excluded.has(url)) referenced.add(url);
    }
  }

  for (const i of inspirations) {
    for (const url of collectUrls(i.image)) {
      if (isLocalUploadUrl(url) && !excluded.has(url)) referenced.add(url);
    }
  }

  for (const s of settings) {
    for (const url of [...collectUrls(s.heroImage), ...collectUrls(s.aboutImage)]) {
      if (isLocalUploadUrl(url) && !excluded.has(url)) referenced.add(url);
    }
  }

  return referenced;
}

function toLocalPath(url) {
  const rel = url.replace(/^\/uploads\//, "");
  if (!rel || rel.includes("..")) return null;
  return path.join(uploadsDir, rel);
}

async function deleteUnusedLocalUrls(candidateUrls, { excludeUrls = [] } = {}) {
  const uniqueCandidates = [...new Set(candidateUrls.filter(isLocalUploadUrl))];
  if (!uniqueCandidates.length) return;

  const referenced = await getReferencedLocalUrls({ excludeUrls });

  for (const url of uniqueCandidates) {
    if (referenced.has(url)) continue;
    const filePath = toLocalPath(url);
    if (!filePath) continue;
    try {
      await fs.unlink(filePath);
    } catch (err) {
      if (err.code !== "ENOENT") {
        console.error("media cleanup error:", err.message);
      }
    }
  }
}

module.exports = { deleteUnusedLocalUrls, isLocalUploadUrl };
