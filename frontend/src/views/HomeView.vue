<template>
  <div class="home">
    <template v-for="sec in sortedSections" :key="sec.type">
      <component
        v-if="sec.enabled && getComponent(sec.type)"
        :is="getComponent(sec.type)"
        :settings="settings"
      />
    </template>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, defineAsyncComponent } from "vue";
import axios from "axios";

const HeroSection = defineAsyncComponent(
  () => import("@/components/HeroSection.vue"),
);
const AboutPreview = defineAsyncComponent(
  () => import("@/components/AboutPreview.vue"),
);
const BrandsPreview = defineAsyncComponent(
  () => import("@/components/BrandsPreview.vue"),
);
const InspirationsPreview = defineAsyncComponent(
  () => import("@/components/InspirationsPreview.vue"),
);
const BlogPreview = defineAsyncComponent(
  () => import("@/components/BlogPreview.vue"),
);
const SocialPreview = defineAsyncComponent(
  () => import("@/components/SocialPreview.vue"),
);
const CtaSection = defineAsyncComponent(
  () => import("@/components/CtaSection.vue"),
);

const componentMap = {
  hero: HeroSection,
  about: AboutPreview,
  brands: BrandsPreview,
  inspirations: InspirationsPreview,
  blog: BlogPreview,
  social: SocialPreview,
  cta: CtaSection,
};
const getComponent = (type) => componentMap[type];

const settings = ref({ homepageSections: [] });
const sortedSections = computed(() =>
  [...settings.value.homepageSections].sort((a, b) => a.order - b.order),
);

onMounted(async () => {
  try {
    const { data } = await axios.get("/api/settings");
    settings.value = data;
  } catch (e) {}
});
</script>
