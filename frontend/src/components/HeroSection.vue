<template>
  <section class="hero">
    <div class="hero__bg" :style="bgStyle"></div>
    <div class="hero__gradient"></div>
    <div class="container hero__content">
      <p class="hero__eyebrow anim-fade-up">Concept Store · Est. 2005</p>
      <h1 class="hero__title font-display anim-fade-up anim-delay-1">
        {{ settings.heroClaim || "Skandynawski styl. Ponadczasowa elegancja." }}
      </h1>
      <div class="hero__actions anim-fade-up anim-delay-2">
        <router-link to="/marki" class="btn btn--primary btn--lg"
          >Odkryj marki</router-link
        >
        <button
          class="btn btn--secondary btn--lg"
          @click="openInquiry"
          style="border-color: rgba(255, 255, 255, 0.3); color: white"
        >
          Zapytaj o dostępność
        </button>
      </div>
    </div>
    <div class="hero__scroll anim-fade-up anim-delay-4">
      <svg
        class="hero__arrow"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M12 5v14M5 12l7 7 7-7" />
      </svg>
    </div>
  </section>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({ settings: { type: Object, default: () => ({}) } });

const bgStyle = computed(() => {
  if (props.settings.heroImage) {
    return { backgroundImage: `url(${props.settings.heroImage})` };
  }
  return { background: "linear-gradient(135deg, #2c2c2c 0%, #1a1a1a 100%)" };
});

const openInquiry = () => {
  window.dispatchEvent(new CustomEvent("open-inquiry"));
};
</script>

<style scoped>
.hero {
  position: relative;
  height: 100vh;
  min-height: 600px;
  display: flex;
  align-items: center;
  overflow: hidden;
  color: white;
}

.hero__bg {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  transform: scale(1.05);
  animation: heroZoom 20s ease-in-out infinite alternate;
}

@keyframes heroZoom {
  from {
    transform: scale(1.05);
  }
  to {
    transform: scale(1.12);
  }
}

.hero__gradient {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.15) 0%,
    rgba(0, 0, 0, 0.4) 60%,
    rgba(0, 0, 0, 0.65) 100%
  );
}

.hero__content {
  position: relative;
  z-index: 1;
  max-width: 700px;
}

.hero__eyebrow {
  font-size: var(--fs-xs);
  text-transform: uppercase;
  letter-spacing: 0.25em;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: var(--sp-md);
}

.hero__title {
  font-size: var(--fs-hero);
  line-height: 1.08;
  margin-bottom: var(--sp-lg);
  font-weight: 400;
}

.hero__actions {
  display: flex;
  gap: var(--sp-sm);
  flex-wrap: wrap;
}

.hero__scroll {
  position: absolute;
  bottom: var(--sp-lg);
  left: 50%;
  transform: translateX(-50%);
  color: rgba(255, 255, 255, 0.5);
}
.hero__arrow {
  animation: bounceDown 2s var(--ease) infinite;
}

@keyframes bounceDown {
  0%,
  100% {
    transform: translateY(0);
    opacity: 0.5;
  }
  50% {
    transform: translateY(8px);
    opacity: 1;
  }
}

@media (max-width: 768px) {
  .hero {
    min-height: 500px;
  }
  .hero__actions {
    flex-direction: column;
  }
  .hero__actions .btn {
    width: 100%;
  }
  .hero__scroll {
    display: none;
  }
}
</style>
