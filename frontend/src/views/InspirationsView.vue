<template>
  <div class="inspirations-page">
    <header class="page-hero">
      <div class="container">
        <span class="page-hero__eyebrow">Galeria</span>
        <h1 class="font-display">Inspiracje</h1>
        <p class="page-hero__sub">
          Naszym okiem — jak prezentują się kolekcje duńskich marek.
        </p>
      </div>
    </header>

    <div class="container section">
      <div class="masonry">
        <div
          v-for="item in items"
          :key="item._id"
          class="masonry__item"
          @click="openLightbox(item)"
        >
          <img
            :src="item.image"
            :alt="item.brand?.name || 'Inspiracja'"
            loading="lazy"
          />
          <div class="masonry__overlay">
            <span v-if="item.brand" class="masonry__brand">{{
              item.brand.name
            }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Lightbox -->
    <Teleport to="body">
      <transition name="modal">
        <div v-if="lightbox" class="lightbox" @click="lightbox = null">
          <img :src="lightbox.image" :alt="lightbox.brand?.name" />
          <div v-if="lightbox.brand" class="lightbox__caption">
            {{ lightbox.brand.name }}
          </div>
          <button class="lightbox__close" aria-label="Zamknij">
            <svg width="24" height="24" viewBox="0 0 20 20" fill="none">
              <path
                d="M15 5L5 15M5 5l10 10"
                stroke="white"
                stroke-width="1.5"
              />
            </svg>
          </button>
        </div>
      </transition>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const items = ref([]);
const lightbox = ref(null);

const openLightbox = (item) => {
  lightbox.value = item;
  document.body.classList.add("modal-open");
};

const closeLightbox = () => {
  lightbox.value = null;
  document.body.classList.remove("modal-open");
};

onMounted(async () => {
  try {
    const { data } = await axios.get("/api/inspirations");
    items.value = data;
  } catch (e) {}
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
  max-width: 420px;
  margin: 0 auto;
}

.masonry {
  column-count: 3;
  column-gap: var(--sp-sm);
}
.masonry__item {
  break-inside: avoid;
  margin-bottom: var(--sp-sm);
  position: relative;
  overflow: hidden;
  border-radius: var(--radius);
  cursor: pointer;
}
.masonry__item img {
  width: 100%;
  display: block;
  transition: transform var(--dur-slow) var(--ease);
}
.masonry__item:hover img {
  transform: scale(1.04);
}

.masonry__overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.5) 0%, transparent 40%);
  opacity: 0;
  transition: opacity var(--dur) var(--ease);
  display: flex;
  align-items: flex-end;
  padding: var(--sp-sm);
}
.masonry__item:hover .masonry__overlay {
  opacity: 1;
}

.masonry__brand {
  color: white;
  font-size: var(--fs-xs);
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

/* Lightbox */
.lightbox {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.92);
  z-index: 3000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--sp-lg);
  cursor: zoom-out;
}
.lightbox img {
  max-width: 90%;
  max-height: 85vh;
  border-radius: var(--radius);
}
.lightbox__caption {
  position: absolute;
  bottom: var(--sp-lg);
  left: 50%;
  transform: translateX(-50%);
  color: white;
  background: rgba(0, 0, 0, 0.5);
  padding: 8px 20px;
  border-radius: var(--radius);
  font-size: var(--fs-sm);
}
.lightbox__close {
  position: absolute;
  top: var(--sp-md);
  right: var(--sp-md);
  padding: 8px;
}

@media (max-width: 900px) {
  .masonry {
    column-count: 2;
  }
}
@media (max-width: 500px) {
  .masonry {
    column-count: 1;
  }
}
</style>
