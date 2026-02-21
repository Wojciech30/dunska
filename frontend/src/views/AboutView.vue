<template>
  <div class="about-page">
    <header class="page-hero">
      <div class="container">
        <span class="page-hero__eyebrow">Nasza historia</span>
        <h1 class="font-display">{{ settings.aboutTitle || "O nas" }}</h1>
      </div>
    </header>

    <div class="container section">
      <div class="about-page__grid">
        <div
          class="about-page__content font-display"
          v-html="
            settings.aboutContent ||
            '<p>Jesteśmy butikiem z 20-letnim doświadczeniem, specjalizującym się w duńskiej modzie premium.</p>'
          "
        ></div>
        <div class="about-page__visual">
          <div class="about-page__img-wrap" v-if="settings.aboutImage">
            <img :src="settings.aboutImage" alt="Duńska Concept Store" />
          </div>
          <div class="about-page__badge">
            <span class="font-display about-page__badge-num">20</span>
            <span class="about-page__badge-label">Lat doświadczenia</span>
          </div>
        </div>
      </div>
    </div>

    <section class="about-visit section bg-alt">
      <div class="container">
        <div class="about-visit__grid">
          <div class="about-visit__info">
            <span class="page-hero__eyebrow">Butik stacjonarny</span>
            <h2 class="font-display">Odwiedź nas</h2>
            <p class="text-muted" style="margin: var(--sp-md) 0">
              Serce marki Duńska to nasz butik stacjonarny — zapraszamy do
              osobistego zapoznania się z kolekcjami.
            </p>
            <div class="about-visit__details">
              <p v-if="settings.address">
                <strong>Adres:</strong> {{ settings.address }}
              </p>
              <p v-if="settings.phone">
                <strong>Telefon:</strong>
                <a :href="`tel:${settings.phone}`">{{ settings.phone }}</a>
              </p>
              <p v-if="settings.contactEmail">
                <strong>Email:</strong>
                <a :href="`mailto:${settings.contactEmail}`">{{
                  settings.contactEmail
                }}</a>
              </p>
            </div>
          </div>
          <div class="about-visit__map">
            <iframe
              v-if="settings.mapUrl"
              :src="settings.mapUrl"
              width="100%"
              height="380"
              style="border: 0; border-radius: var(--radius)"
              allowfullscreen
              loading="lazy"
            ></iframe>
            <div v-else class="about-visit__map-placeholder"></div>
          </div>
        </div>
      </div>
    </section>
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

.about-page__grid {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: var(--sp-2xl);
  align-items: flex-start;
}

.about-page__content {
  font-size: 1.3rem;
  line-height: 1.65;
}
.about-page__content :deep(p) {
  margin-bottom: var(--sp-md);
}

.about-page__img-wrap {
  border-radius: var(--radius);
  overflow: hidden;
}
.about-page__img-wrap img {
  width: 100%;
  box-shadow: var(--shadow-lg);
}

.about-page__visual {
  position: relative;
}

.about-page__badge {
  position: absolute;
  bottom: -20px;
  left: -20px;
  background: var(--clr-text);
  color: white;
  padding: var(--sp-md);
  border-radius: var(--radius);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}
.about-page__badge-num {
  font-size: 2.8rem;
  line-height: 1;
}
.about-page__badge-label {
  font-size: var(--fs-xs);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: rgba(255, 255, 255, 0.5);
  margin-top: 4px;
}

.about-visit__grid {
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: var(--sp-xl);
  align-items: center;
}

.about-visit__details {
  margin-top: var(--sp-md);
}
.about-visit__details p {
  margin-bottom: 8px;
  font-size: var(--fs-base);
}

.about-visit__map-placeholder {
  width: 100%;
  height: 380px;
  background: var(--clr-border-light);
  border-radius: var(--radius);
}

@media (max-width: 900px) {
  .about-page__grid,
  .about-visit__grid {
    grid-template-columns: 1fr;
    gap: var(--sp-lg);
  }
  .about-page__badge {
    position: relative;
    bottom: auto;
    left: auto;
    width: fit-content;
    margin-top: var(--sp-sm);
  }
}
</style>
