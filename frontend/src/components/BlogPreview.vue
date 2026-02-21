<template>
  <section class="blog-preview section bg-alt">
    <div class="container">
      <div class="section-header">
        <h2 class="font-display">Blog</h2>
        <router-link to="/blog" class="section-link"
          >Wszystkie wpisy →</router-link
        >
      </div>

      <div class="blog-preview__grid">
        <router-link
          v-for="post in posts"
          :key="post._id"
          :to="`/blog/${post.slug}`"
          class="blog-card"
        >
          <div class="blog-card__img">
            <img
              v-if="post.coverImage"
              :src="post.coverImage"
              :alt="post.title"
              loading="lazy"
            />
          </div>
          <div class="blog-card__body">
            <div class="blog-card__meta">
              <span class="blog-card__cat">{{ post.category }}</span>
              <span class="blog-card__date">{{
                formatDate(post.createdAt)
              }}</span>
            </div>
            <h3 class="font-display">{{ post.title }}</h3>
            <p>{{ post.excerpt }}</p>
          </div>
        </router-link>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const posts = ref([]);

const formatDate = (d) =>
  new Date(d).toLocaleDateString("pl-PL", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

onMounted(async () => {
  try {
    const { data } = await axios.get("/api/blog?limit=3");
    posts.value = data;
  } catch (e) {}
});
</script>

<style scoped>
.blog-preview__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--sp-md);
}

.blog-card {
  background: var(--clr-surface);
  border: 1px solid var(--clr-border-light);
  border-radius: var(--radius);
  overflow: hidden;
  transition: all var(--dur) var(--ease);
}
.blog-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
}

.blog-card__img {
  aspect-ratio: 16/10;
  overflow: hidden;
  background: var(--clr-surface-alt);
}
.blog-card__img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--dur-slow) var(--ease);
}
.blog-card:hover .blog-card__img img {
  transform: scale(1.05);
}

.blog-card__body {
  padding: var(--sp-md);
}

.blog-card__meta {
  display: flex;
  gap: var(--sp-sm);
  font-size: var(--fs-xs);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-bottom: 12px;
  color: var(--clr-text-muted);
}
.blog-card__cat {
  color: var(--clr-accent-hover);
  font-weight: 600;
}

.blog-card__body h3 {
  font-size: var(--fs-lg);
  margin-bottom: 8px;
  line-height: 1.25;
  transition: color var(--dur-fast) var(--ease);
}
.blog-card:hover h3 {
  color: var(--clr-accent-hover);
}

.blog-card__body p {
  font-size: var(--fs-sm);
  color: var(--clr-text-muted);
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

@media (max-width: 900px) {
  .blog-preview__grid {
    grid-template-columns: 1fr;
    max-width: 500px;
  }
}
</style>
