<template>
  <section class="brands-preview section bg-alt">
    <div class="container">
      <div class="section-header">
        <h2 class="font-display">Nasze marki</h2>
        <router-link to="/marki" class="section-link"
          >Zobacz wszystkie →</router-link
        >
      </div>

      <div class="brands-preview__grid">
        <router-link
          v-for="brand in displayBrands"
          :key="brand._id"
          :to="`/marki/${brand.slug}`"
          class="brand-tile"
        >
          <div class="brand-tile__img">
            <img v-if="brand.logo" :src="brand.logo" :alt="brand.name" />
          </div>
          <div class="brand-tile__info">
            <h3>{{ brand.name }}</h3>
            <span v-if="brand.isPremium" class="tag tag--premium">{{
              brand.premiumLabel || "Premium"
            }}</span>
          </div>
          <span class="brand-tile__arrow">→</span>
        </router-link>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import axios from "axios";

const brands = ref([]);
const displayBrands = computed(() => brands.value.slice(0, 6));

onMounted(async () => {
  try {
    const { data } = await axios.get("/api/brands");
    brands.value = data;
  } catch (e) {}
});
</script>

<style scoped>
.brands-preview__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--sp-sm);
}

.brand-tile {
  display: flex;
  align-items: center;
  gap: var(--sp-md);
  padding: var(--sp-md) var(--sp-md);
  background: var(--clr-surface);
  border: 1px solid var(--clr-border-light);
  border-radius: var(--radius);
  transition: all var(--dur) var(--ease);
}
.brand-tile:hover {
  border-color: var(--clr-accent);
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
}

.brand-tile__img {
  width: 64px;
  height: 64px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--clr-surface-alt);
  border-radius: var(--radius);
  padding: 8px;
}
.brand-tile__img img {
  max-width: 100%;
  max-height: 48px;
  object-fit: contain;
}

.brand-tile__info {
  flex: 1;
  min-width: 0;
}
.brand-tile__info h3 {
  font-family: var(--font-body);
  font-size: var(--fs-base);
  font-weight: 600;
  margin-bottom: 4px;
}

.brand-tile__arrow {
  font-size: 1.2rem;
  color: var(--clr-text-light);
  transition: transform var(--dur-fast) var(--ease);
}
.brand-tile:hover .brand-tile__arrow {
  transform: translateX(4px);
  color: var(--clr-accent);
}

@media (max-width: 900px) {
  .brands-preview__grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 500px) {
  .brands-preview__grid {
    grid-template-columns: 1fr;
  }
}
</style>
