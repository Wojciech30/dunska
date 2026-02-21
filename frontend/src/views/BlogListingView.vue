<template>
  <div class="blog-page">
    <header class="page-hero">
      <div class="container">
        <span class="page-hero__eyebrow">Trendy & Inspiracje</span>
        <h1 class="font-display">Blog</h1>
        <p class="page-hero__sub">
          Inspiracje, nowości i porady ze świata skandynawskiej mody.
        </p>
      </div>
    </header>

    <div class="container section">
      <div class="blog-page__grid">
        <router-link
          v-for="post in posts"
          :key="post._id"
          :to="`/blog/${post.slug}`"
          class="blog-item card"
        >
          <div class="blog-item__img">
            <img
              v-if="post.coverImage"
              :src="post.coverImage"
              :alt="post.title"
              loading="lazy"
            />
          </div>
          <div class="blog-item__body">
            <div class="blog-item__meta">
              <span class="blog-item__cat">{{ post.category }}</span>
              <time>{{ formatDate(post.createdAt) }}</time>
            </div>
            <h2 class="font-display">{{ post.title }}</h2>
            <p class="blog-item__excerpt">{{ post.excerpt }}</p>
            <span class="blog-item__read">Czytaj dalej →</span>
          </div>
        </router-link>
      </div>

      <div
        v-if="!posts.length && !loading"
        class="text-center text-muted"
        style="padding: var(--sp-2xl)"
      >
        Brak wpisów na blogu.
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const posts = ref([]);
const loading = ref(true);

const formatDate = (d) =>
  new Date(d).toLocaleDateString("pl-PL", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

onMounted(async () => {
  try {
    const { data } = await axios.get("/api/blog");
    posts.value = data;
  } catch (e) {
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped>
.page-hero {
  background: var(--clr-surface-alt);
  padding: calc(var(--nav-h) + var(--sp-xl)) 0 var(--sp-xl);
  text-align: center;
}
.page-hero__eyebrow {
  display: block;
  font-size: var(--fs-xs);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: var(--clr-accent);
  margin-bottom: var(--sp-sm);
}
.page-hero__sub {
  color: var(--clr-text-muted);
  max-width: 480px;
  margin: 0 auto;
}

.blog-page__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
  gap: var(--sp-lg);
}

.blog-item {
  display: flex;
  flex-direction: column;
}

.blog-item__img {
  aspect-ratio: 16/10;
  overflow: hidden;
  background: var(--clr-surface-alt);
}
.blog-item__img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--dur-slow) var(--ease);
}
.blog-item:hover .blog-item__img img {
  transform: scale(1.05);
}

.blog-item__body {
  padding: var(--sp-md);
  flex: 1;
  display: flex;
  flex-direction: column;
}

.blog-item__meta {
  display: flex;
  gap: var(--sp-sm);
  font-size: var(--fs-xs);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--clr-text-muted);
  margin-bottom: 12px;
}
.blog-item__cat {
  color: var(--clr-accent-hover);
  font-weight: 600;
}

.blog-item__body h2 {
  font-size: var(--fs-xl);
  margin-bottom: 8px;
  line-height: 1.2;
}

.blog-item__excerpt {
  font-size: var(--fs-sm);
  color: var(--clr-text-muted);
  line-height: 1.65;
  flex: 1;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.blog-item__read {
  font-size: var(--fs-xs);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--clr-text-muted);
  margin-top: var(--sp-sm);
  transition: color var(--dur-fast) var(--ease);
}
.blog-item:hover .blog-item__read {
  color: var(--clr-accent);
}
</style>
