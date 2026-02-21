<template>
  <div class="brands-page">
    <header class="page-hero">
      <div class="container">
        <span class="page-hero__eyebrow">Kolekcja</span>
        <h1 class="font-display">Nasze marki</h1>
        <p class="page-hero__sub">
          Wyselekcjonowane duńskie marki premium — od minimalistycznych klasyków
          po odważne nowości.
        </p>
      </div>
    </header>

    <div class="container section">
      <div class="brands-page__grid">
        <router-link
          v-for="brand in brands"
          :key="brand._id"
          :to="`/marki/${brand.slug}`"
          class="brand-card card"
        >
          <div class="brand-card__visual">
            <img v-if="brand.logo" :src="brand.logo" :alt="brand.name" />
            <span v-if="brand.isPremium" class="tag tag--premium">{{
              brand.premiumLabel || "Premium"
            }}</span>
          </div>
          <div class="brand-card__body">
            <h3 class="font-display">{{ brand.name }}</h3>
            <span class="brand-card__link">Zobacz kolekcję →</span>
          </div>
        </router-link>
      </div>

      <div
        v-if="!brands.length && !loading"
        class="text-center text-muted"
        style="padding: var(--sp-2xl)"
      >
        Brak marek do wyświetlenia.
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const brands = ref([]);
const loading = ref(true);

onMounted(async () => {
  try {
    const { data } = await axios.get("/api/brands");
    brands.value = data;
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
.page-hero h1 {
  margin-bottom: var(--sp-sm);
}
.page-hero__sub {
  color: var(--clr-text-muted);
  max-width: 500px;
  margin: 0 auto;
}

.brands-page__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: var(--sp-md);
}

.brand-card {
  display: flex;
  flex-direction: column;
}

.brand-card__visual {
  aspect-ratio: 4/3;
  background: var(--clr-surface-alt);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--sp-lg);
  position: relative;
}
.brand-card__visual img {
  max-width: 160px;
  max-height: 80px;
  object-fit: contain;
  transition: transform var(--dur) var(--ease);
}
.brand-card:hover .brand-card__visual img {
  transform: scale(1.08);
}
.brand-card__visual .tag {
  position: absolute;
  top: var(--sp-sm);
  right: var(--sp-sm);
}

.brand-card__body {
  padding: var(--sp-md);
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.brand-card__body h3 {
  font-size: var(--fs-lg);
}
.brand-card__link {
  font-size: var(--fs-xs);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--clr-text-muted);
  white-space: nowrap;
  transition: color var(--dur-fast) var(--ease);
}
.brand-card:hover .brand-card__link {
  color: var(--clr-accent);
}
</style>
