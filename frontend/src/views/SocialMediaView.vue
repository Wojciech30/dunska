<template>
  <div class="social-page">
    <header class="page-hero">
      <div class="container">
        <span class="page-hero__eyebrow">Bądźmy w kontakcie</span>
        <h1 class="font-display">Social Media</h1>
        <p class="page-hero__sub">
          Znajdź nas na swoich ulubionych platformach.
        </p>
      </div>
    </header>

    <div class="container section">
      <div class="social-page__cards">
        <a
          v-if="settings.instagramUrl"
          :href="settings.instagramUrl"
          target="_blank"
          rel="noopener"
          class="social-card"
        >
          <div class="social-card__icon">
            <svg
              viewBox="0 0 24 24"
              width="32"
              height="32"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
            >
              <rect x="3" y="3" width="18" height="18" rx="5" />
              <circle cx="12" cy="12" r="4.5" />
              <circle
                cx="17.5"
                cy="6.5"
                r="1.2"
                fill="currentColor"
                stroke="none"
              />
            </svg>
          </div>
          <span class="social-card__platform">Instagram</span>
          <h2 class="font-display">@dunska_concept_store</h2>
          <p>Inspiracje, backstage i nowe kolekcje każdego dnia.</p>
          <span class="social-card__cta">Obserwuj nas ↗</span>
        </a>

        <a
          v-if="settings.facebookUrl"
          :href="settings.facebookUrl"
          target="_blank"
          rel="noopener"
          class="social-card"
        >
          <div class="social-card__icon">
            <svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor">
              <path
                d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z"
              />
            </svg>
          </div>
          <span class="social-card__platform">Facebook</span>
          <h2 class="font-display">Duńska Concept Store</h2>
          <p>Wydarzenia, oferty specjalne i nowości.</p>
          <span class="social-card__cta">Polub nas ↗</span>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const settings = ref({});

onMounted(async () => {
  try {
    const { data } = await axios.get("/api/settings");
    settings.value = data;
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

.social-page__cards {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--sp-md);
  max-width: 800px;
  margin: 0 auto;
}

.social-card {
  background: var(--clr-surface);
  border: 1px solid var(--clr-border-light);
  border-radius: var(--radius-lg);
  padding: var(--sp-xl);
  text-align: center;
  transition: all var(--dur) var(--ease);
}
.social-card:hover {
  border-color: var(--clr-accent);
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
}

.social-card__icon {
  color: var(--clr-text-muted);
  margin-bottom: var(--sp-md);
}

.social-card__platform {
  display: block;
  font-size: var(--fs-xs);
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: var(--clr-text-light);
  margin-bottom: var(--sp-sm);
}

.social-card h2 {
  font-size: var(--fs-xl);
  margin-bottom: 8px;
}
.social-card p {
  color: var(--clr-text-muted);
  font-size: var(--fs-sm);
  margin-bottom: var(--sp-md);
  line-height: 1.5;
}

.social-card__cta {
  font-size: var(--fs-xs);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--clr-accent);
}

@media (max-width: 600px) {
  .social-page__cards {
    grid-template-columns: 1fr;
  }
  .social-card {
    padding: var(--sp-lg);
  }
}
</style>
