<template>
  <article v-if="post" class="post">
    <div class="post__cover" v-if="post.coverImage">
      <img :src="post.coverImage" :alt="post.title" />
    </div>

    <div class="container container--narrow section">
      <header class="post__header text-center">
        <div class="post__meta">
          <span class="post__cat">{{ post.category }}</span>
          <time>{{ formatDate(post.createdAt) }}</time>
        </div>
        <h1 class="font-display">{{ post.title }}</h1>
        <router-link
          v-if="post.brand"
          :to="`/marki/${post.brand.slug}`"
          class="post__brand"
        >
          Powiązana marka: <strong>{{ post.brand.name }}</strong>
        </router-link>
      </header>

      <div class="post__content" v-html="post.content"></div>

      <footer class="post__footer">
        <router-link to="/blog" class="btn btn--ghost"
          >← Wszystkie wpisy</router-link
        >
      </footer>
    </div>
  </article>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";

const route = useRoute();
const post = ref(null);

const formatDate = (d) =>
  new Date(d).toLocaleDateString("pl-PL", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

onMounted(async () => {
  try {
    const { data } = await axios.get(`/api/blog/${route.params.slug}`);
    post.value = data;
  } catch (e) {}
});
</script>

<style scoped>
.post__cover {
  width: 100%;
  height: 55vh;
  min-height: 320px;
  overflow: hidden;
}
.post__cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.post__header {
  margin-bottom: var(--sp-xl);
}

.post__meta {
  display: flex;
  justify-content: center;
  gap: var(--sp-sm);
  font-size: var(--fs-xs);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--clr-text-muted);
  margin-bottom: var(--sp-md);
}
.post__cat {
  color: var(--clr-accent-hover);
  font-weight: 600;
}

.post__header h1 {
  font-size: var(--fs-3xl);
  margin-bottom: var(--sp-sm);
}

.post__brand {
  font-size: var(--fs-sm);
  color: var(--clr-text-muted);
  text-decoration: underline;
  text-underline-offset: 3px;
}

.post__content {
  font-size: 1.15rem;
  line-height: 1.85;
  color: var(--clr-text);
}
.post__content :deep(img) {
  max-width: 100%;
  margin: var(--sp-lg) 0;
  border-radius: var(--radius);
}
.post__content :deep(h2) {
  font-family: var(--font-display);
  font-size: var(--fs-xl);
  margin: var(--sp-xl) 0 var(--sp-md);
}
.post__content :deep(h3) {
  font-family: var(--font-display);
  font-size: var(--fs-lg);
  margin: var(--sp-lg) 0 var(--sp-sm);
}
.post__content :deep(p) {
  margin-bottom: var(--sp-md);
}
.post__content :deep(blockquote) {
  border-left: 3px solid var(--clr-accent);
  padding-left: var(--sp-md);
  color: var(--clr-text-muted);
  font-style: italic;
  margin: var(--sp-lg) 0;
}

.post__footer {
  margin-top: var(--sp-2xl);
  padding-top: var(--sp-lg);
  border-top: 1px solid var(--clr-border-light);
}

@media (max-width: 768px) {
  .post__cover {
    height: 40vh;
    min-height: 240px;
  }
  .post__header h1 {
    font-size: var(--fs-2xl);
  }
}
</style>
