<template>
  <div class="dashboard">
    <h1 class="admin-title">Dashboard</h1>

    <div class="stats-grid">
      <div class="stat-card">
        <span class="stat-card__value font-display">{{ stats.inquiries }}</span>
        <span class="stat-card__label">Nowe zapytania</span>
      </div>
      <div class="stat-card">
        <span class="stat-card__value font-display">{{ stats.brands }}</span>
        <span class="stat-card__label">Marki</span>
      </div>
      <div class="stat-card">
        <span class="stat-card__value font-display">{{ stats.posts }}</span>
        <span class="stat-card__label">Wpisy na blogu</span>
      </div>
      <div class="stat-card">
        <span class="stat-card__value font-display">{{
          stats.inspirations
        }}</span>
        <span class="stat-card__label">Inspiracje</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, onMounted } from "vue";
import axios from "axios";

const stats = reactive({ inquiries: 0, brands: 0, posts: 0, inspirations: 0 });

onMounted(async () => {
  try {
    const [inq, brands, posts, insp] = await Promise.all([
      axios.get("/api/inquiries/admin"),
      axios.get("/api/brands"),
      axios.get("/api/blog/admin/all"),
      axios.get("/api/inspirations"),
    ]);
    stats.inquiries = inq.data.length;
    stats.brands = brands.data.length;
    stats.posts = posts.data.length;
    stats.inspirations = insp.data.length;
  } catch (e) {}
});
</script>

<style scoped>
.admin-title {
  font-family: var(--font-body);
  font-size: var(--fs-xl);
  font-weight: 600;
  margin-bottom: var(--sp-lg);
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: var(--sp-sm);
}

.stat-card {
  background: var(--clr-surface);
  border: 1px solid var(--clr-border-light);
  border-radius: var(--radius);
  padding: var(--sp-lg) var(--sp-md);
  text-align: center;
}
.stat-card__value {
  display: block;
  font-size: 2.8rem;
  line-height: 1;
  margin-bottom: 8px;
  color: var(--clr-text);
}
.stat-card__label {
  font-size: var(--fs-xs);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--clr-text-muted);
}
</style>
