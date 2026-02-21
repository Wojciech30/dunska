<template>
  <section class="about-preview section">
    <div class="container about-preview__grid">
      <div class="about-preview__text anim-fade-up">
        <span class="about-preview__eyebrow">O Duńska</span>
        <h2 class="font-display">{{ settings.aboutTitle || "O nas" }}</h2>
        <p class="about-preview__body">
          {{
            settings.aboutPreview ||
            "Duńska to butik z 20-letnim doświadczeniem, który łączy skandynawski minimalizm z ponadczasową elegancją."
          }}
        </p>
        <router-link to="/o-nas" class="btn btn--secondary"
          >Nasza historia</router-link
        >
      </div>
      <div class="about-preview__visual anim-fade-up anim-delay-2">
        <div class="about-preview__img-wrap">
          <img
            v-if="settings.aboutImage"
            :src="settings.aboutImage"
            alt="O Duńska Concept Store"
          />
          <div v-else class="about-preview__placeholder"></div>
        </div>
        <div class="about-preview__badge">
          <span class="about-preview__badge-num font-display">20</span>
          <span class="about-preview__badge-label">lat doświadczenia</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({ settings: { type: Object, default: () => ({}) } });
</script>

<style scoped>
.about-preview__grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--sp-2xl);
  align-items: center;
}

.about-preview__eyebrow {
  display: block;
  font-size: var(--fs-xs);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: var(--clr-accent);
  margin-bottom: var(--sp-sm);
}

.about-preview__text h2 {
  margin-bottom: var(--sp-md);
}

.about-preview__body {
  font-size: var(--fs-md);
  line-height: 1.8;
  color: var(--clr-text-muted);
  margin-bottom: var(--sp-lg);
}

.about-preview__visual {
  position: relative;
}

.about-preview__img-wrap {
  overflow: hidden;
  border-radius: var(--radius);
}
.about-preview__img-wrap img {
  width: 100%;
  aspect-ratio: 0.85;
  object-fit: cover;
  transition: transform var(--dur-slow) var(--ease);
}
.about-preview__img-wrap:hover img {
  transform: scale(1.03);
}

.about-preview__placeholder {
  width: 100%;
  aspect-ratio: 0.85;
  background: var(--clr-surface-alt);
}

.about-preview__badge {
  position: absolute;
  bottom: -24px;
  left: -24px;
  background: var(--clr-text);
  color: white;
  padding: var(--sp-md);
  display: flex;
  flex-direction: column;
  align-items: center;
  line-height: 1;
  border-radius: var(--radius);
}
.about-preview__badge-num {
  font-size: 3rem;
}
.about-preview__badge-label {
  font-size: var(--fs-xs);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: rgba(255, 255, 255, 0.5);
  margin-top: 4px;
}

@media (max-width: 768px) {
  .about-preview__grid {
    grid-template-columns: 1fr;
    gap: var(--sp-lg);
  }
  .about-preview__badge {
    position: relative;
    bottom: auto;
    left: auto;
    width: fit-content;
    margin-top: var(--sp-sm);
  }
}
</style>
