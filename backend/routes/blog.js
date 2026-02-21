const express = require("express");
const router = express.Router();
const BlogPost = require("../models/BlogPost");
const adminAuth = require("../middleware/auth");

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
    const post = new BlogPost(req.body);
    await post.save();
    res.status(201).json(post);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ADMIN — Update post
router.put("/admin/:id", adminAuth, async (req, res) => {
  try {
    const post = await BlogPost.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!post) return res.status(404).json({ error: "Post not found" });
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
    res.json({ message: "Post deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
