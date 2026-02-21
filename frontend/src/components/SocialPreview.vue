<template>
  <section class="social-preview section">
    <div class="container text-center">
      <span class="social-preview__eyebrow">Bądźmy w kontakcie</span>
      <h2 class="font-display">Zaobserwuj nas</h2>
      <p class="social-preview__sub text-muted">
        Codzienne inspiracje, nowości i backstage na naszych profilach.
      </p>

      <div class="social-preview__feed">
        <div v-for="n in 6" :key="n" class="social-preview__placeholder">
          <svg
            viewBox="0 0 24 24"
            width="24"
            height="24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
          >
            <rect x="3" y="3" width="18" height="18" rx="4" />
            <circle cx="12" cy="12" r="4" />
            <circle cx="17.5" cy="6.5" r="1.2" />
          </svg>
        </div>
      </div>

      <div class="social-preview__links">
        <a
          v-if="settings.instagramUrl"
          :href="settings.instagramUrl"
          target="_blank"
          rel="noopener"
          class="btn btn--secondary"
          >Instagram</a
        >
        <a
          v-if="settings.facebookUrl"
          :href="settings.facebookUrl"
          target="_blank"
          rel="noopener"
          class="btn btn--secondary"
          >Facebook</a
        >
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({ settings: { type: Object, default: () => ({}) } });
</script>

<style scoped>
.social-preview__eyebrow {
  display: block;
  font-size: var(--fs-xs);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: var(--clr-accent);
  margin-bottom: var(--sp-sm);
}

.social-preview__sub {
  max-width: 400px;
  margin: var(--sp-sm) auto var(--sp-xl);
}

.social-preview__feed {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: var(--sp-xs);
  margin-bottom: var(--sp-xl);
}

.social-preview__placeholder {
  aspect-ratio: 1;
  background: var(--clr-surface-alt);
  border-radius: var(--radius);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--clr-text-light);
  transition: background var(--dur-fast) var(--ease);
}
.social-preview__placeholder:hover {
  background: var(--clr-border);
}

.social-preview__links {
  display: flex;
  justify-content: center;
  gap: var(--sp-sm);
}

@media (max-width: 768px) {
  .social-preview__feed {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>
