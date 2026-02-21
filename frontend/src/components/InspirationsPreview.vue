<template>
  <section class="insp-preview section">
    <div class="container">
      <div class="section-header">
        <h2 class="font-display">Inspiracje</h2>
        <router-link to="/inspiracje" class="section-link"
          >Galeria →</router-link
        >
      </div>

      <div class="insp-preview__grid">
        <div
          v-for="(item, i) in displayItems"
          :key="item._id"
          class="insp-preview__item"
          :class="`insp-preview__item--${i}`"
        >
          <img
            :src="item.image"
            :alt="item.brand?.name || 'Inspiracja'"
            loading="lazy"
          />
          <div class="insp-preview__overlay">
            <span v-if="item.brand" class="insp-preview__brand">{{
              item.brand.name
            }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import axios from "axios";

const items = ref([]);
const displayItems = computed(() => items.value.slice(0, 4));

onMounted(async () => {
  try {
    const { data } = await axios.get("/api/inspirations");
    items.value = data;
  } catch (e) {}
});
</script>

<style scoped>
.insp-preview__grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: 280px 280px;
  gap: var(--sp-sm);
}

/* First image spans 2 rows for visual interest */
.insp-preview__item--0 {
  grid-row: 1 / 3;
}

.insp-preview__item {
  position: relative;
  overflow: hidden;
  border-radius: var(--radius);
}

.insp-preview__item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--dur-slow) var(--ease);
}
.insp-preview__item:hover img {
  transform: scale(1.06);
}

.insp-preview__overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.5) 0%, transparent 50%);
  display: flex;
  align-items: flex-end;
  padding: var(--sp-sm);
  opacity: 0;
  transition: opacity var(--dur) var(--ease);
}
.insp-preview__item:hover .insp-preview__overlay {
  opacity: 1;
}

.insp-preview__brand {
  color: white;
  font-size: var(--fs-xs);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-weight: 500;
}

@media (max-width: 900px) {
  .insp-preview__grid {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 200px 200px;
  }
  .insp-preview__item--0 {
    grid-row: auto;
  }
}
</style>
