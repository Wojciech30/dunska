<template>
  <div v-if="brand" class="brand-detail">
    <header class="brand-hero" :style="heroStyle">
      <div class="brand-hero__overlay"></div>
      <div class="container brand-hero__content">
        <div class="brand-hero__logo">
          <img v-if="brand.logo" :src="brand.logo" :alt="brand.name" />
        </div>
        <h1 class="font-display">{{ brand.name }}</h1>
        <span
          v-if="brand.isPremium"
          class="tag tag--premium"
          style="margin-top: var(--sp-sm)"
          >{{ brand.premiumLabel || "Premium selection" }}</span
        >
      </div>
    </header>

    <div class="container section">
      <div class="brand-detail__grid">
        <div class="brand-detail__info">
          <div class="brand-detail__desc" v-html="brand.description"></div>
          <button
            class="btn btn--accent btn--lg"
            @click="inquire"
            style="margin-top: var(--sp-lg)"
          >
            Zapytaj o produkty {{ brand.name }}
          </button>
        </div>
        <div class="brand-detail__gallery" v-if="brand.gallery?.length">
          <div
            v-for="(img, i) in brand.gallery"
            :key="i"
            class="brand-detail__gallery-item"
          >
            <img :src="img" :alt="`${brand.name} ${i + 1}`" loading="lazy" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";

const route = useRoute();
const brand = ref(null);

const heroStyle = computed(() => {
  if (brand.value?.heroImage)
    return { backgroundImage: `url(${brand.value.heroImage})` };
  return { background: "linear-gradient(135deg, #2c2c2c, #1a1a1a)" };
});

const inquire = () => {
  localStorage.setItem("inquiry_brand", brand.value.name);
  window.dispatchEvent(new CustomEvent("open-inquiry"));
};

onMounted(async () => {
  try {
    const { data } = await axios.get(`/api/brands/${route.params.slug}`);
    brand.value = data;
  } catch (e) {}
});
</script>

<style scoped>
.brand-hero {
  position: relative;
  height: 55vh;
  min-height: 380px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: white;
  background-size: cover;
  background-position: center;
}
.brand-hero__overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.25),
    rgba(0, 0, 0, 0.55)
  );
}
.brand-hero__content {
  position: relative;
  z-index: 1;
}
.brand-hero__logo {
  display: inline-block;
  background: white;
  padding: var(--sp-sm) var(--sp-md);
  border-radius: var(--radius);
  margin-bottom: var(--sp-md);
}
.brand-hero__logo img {
  height: 48px;
}
.brand-hero h1 {
  font-size: var(--fs-3xl);
  text-shadow: 0 2px 12px rgba(0, 0, 0, 0.3);
}

.brand-detail__grid {
  display: grid;
  grid-template-columns: 1fr 1.4fr;
  gap: var(--sp-2xl);
  align-items: flex-start;
}

.brand-detail__desc {
  font-size: var(--fs-md);
  line-height: 1.85;
  color: var(--clr-text);
}
.brand-detail__desc :deep(p) {
  margin-bottom: var(--sp-sm);
}

.brand-detail__gallery {
  display: grid;
  gap: var(--sp-sm);
}
.brand-detail__gallery-item {
  border-radius: var(--radius);
  overflow: hidden;
}
.brand-detail__gallery-item img {
  width: 100%;
  transition: transform var(--dur-slow) var(--ease);
}
.brand-detail__gallery-item:hover img {
  transform: scale(1.03);
}

@media (max-width: 900px) {
  .brand-detail__grid {
    grid-template-columns: 1fr;
    gap: var(--sp-lg);
  }
  .brand-hero {
    height: 40vh;
    min-height: 280px;
  }
}
</style>
