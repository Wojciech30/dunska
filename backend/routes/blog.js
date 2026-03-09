const express = require("express");
const router = express.Router();
const BlogPost = require("../models/BlogPost");
const adminAuth = require("../middleware/auth");
const { sanitizeHtml } = require("../utils/sanitizeHtml");
const { deleteUnusedLocalUrls } = require("../services/mediaCleanup");

// PUBLIC — Get published blog posts
router.get("/", async (req, res) => {
  try {
    const { category, brand, limit } = req.query;
    const filter = { published: true };
    if (category) filter.category = category;
    if (brand) filter.brand = brand;

    let query = BlogPost.find(filter)
      .populate("brand", "name slug")
      .sort({ createdAt: -1 });

    if (limit) query = query.limit(parseInt(limit));

    const posts = await query;
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ADMIN — Get single post by id (including drafts)
router.get("/admin/:id([0-9a-fA-F]{24})", adminAuth, async (req, res) => {
  try {
    const post = await BlogPost.findById(req.params.id).populate(
      "brand",
      "name slug",
    );
    if (!post) return res.status(404).json({ error: "Post not found" });
    res.json(post);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUBLIC — Get single post by slug
router.get("/:slug", async (req, res) => {
  try {
    const post = await BlogPost.findOne({
      slug: req.params.slug,
      published: true,
    }).populate("brand", "name slug");
    if (!post) return res.status(404).json({ error: "Post not found" });
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ADMIN — Get all posts (including drafts)
router.get("/admin/all", adminAuth, async (req, res) => {
  try {
    const posts = await BlogPost.find()
      .populate("brand", "name slug")
      .sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ADMIN — Create post
router.post("/admin", adminAuth, async (req, res) => {
  try {
    const payload = { ...req.body };
    if (Object.prototype.hasOwnProperty.call(req.body, "content")) {
      payload.content = sanitizeHtml(req.body.content);
    }
    if (Object.prototype.hasOwnProperty.call(req.body, "excerpt")) {
      payload.excerpt = sanitizeHtml(req.body.excerpt);
    }
    const post = new BlogPost(payload);
    await post.save();
    res.status(201).json(post);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ADMIN — Update post
router.put("/admin/:id", adminAuth, async (req, res) => {
  try {
    const existing = await BlogPost.findById(req.params.id);
    if (!existing) return res.status(404).json({ error: "Post not found" });

    const payload = { ...req.body };
    if (Object.prototype.hasOwnProperty.call(req.body, "content")) {
      payload.content = sanitizeHtml(req.body.content);
    }
    if (Object.prototype.hasOwnProperty.call(req.body, "excerpt")) {
      payload.excerpt = sanitizeHtml(req.body.excerpt);
    }
    const post = await BlogPost.findByIdAndUpdate(req.params.id, payload, {
      new: true,
      runValidators: true,
    });
    if (!post) return res.status(404).json({ error: "Post not found" });

    deleteUnusedLocalUrls([existing.coverImage], {
      excludeUrls: [post.coverImage],
    }).catch((err) => console.error("blog cleanup error:", err.message));

    res.json(post);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ADMIN — Delete post
router.delete("/admin/:id", adminAuth, async (req, res) => {
  try {
    const post = await BlogPost.findByIdAndDelete(req.params.id);
    if (!post) return res.status(404).json({ error: "Post not found" });

    deleteUnusedLocalUrls([post.coverImage]).catch((err) =>
      console.error("blog cleanup error:", err.message),
    );

    res.json({ message: "Post deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
