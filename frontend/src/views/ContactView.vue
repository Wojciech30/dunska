<template>
  <div class="contact-page">
    <header class="page-hero">
      <div class="container">
        <span class="page-hero__eyebrow">Skontaktuj się</span>
        <h1 class="font-display">Kontakt</h1>
      </div>
    </header>

    <section class="section">
      <div class="container contact-grid">
        <div class="contact-card">
          <h2 class="font-display">Dane kontaktowe</h2>
          <p v-if="settings.address"><strong>Adres:</strong> {{ settings.address }}</p>
          <p v-if="settings.phone">
            <strong>Telefon:</strong>
            <a :href="`tel:${settings.phone}`">{{ settings.phone }}</a>
          </p>
          <p v-if="settings.contactEmail">
            <strong>Email:</strong>
            <a :href="`mailto:${settings.contactEmail}`">{{ settings.contactEmail }}</a>
          </p>

          <div class="contact-social">
            <a v-if="settings.instagramUrl" :href="settings.instagramUrl" target="_blank" rel="noopener">
              Instagram
            </a>
            <a v-if="settings.facebookUrl" :href="settings.facebookUrl" target="_blank" rel="noopener">
              Facebook
            </a>
          </div>
        </div>

        <div class="contact-map">
          <iframe
            v-if="settings.mapUrl"
            :src="settings.mapUrl"
            width="100%"
            height="420"
            style="border: 0; border-radius: var(--radius)"
            loading="lazy"
          ></iframe>
          <div v-else class="map-placeholder"></div>
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
.contact-grid {
  display: grid;
  grid-template-columns: 1fr 1.4fr;
  gap: var(--sp-xl);
}
.contact-card {
  background: var(--clr-surface);
  border: 1px solid var(--clr-border-light);
  border-radius: var(--radius);
  padding: var(--sp-lg);
}
.contact-card h2 {
  margin-bottom: var(--sp-md);
}
.contact-card p {
  margin-bottom: 10px;
}
.contact-social {
  margin-top: var(--sp-md);
  display: flex;
  gap: var(--sp-md);
}
.contact-map {
  min-height: 420px;
}
.map-placeholder {
  width: 100%;
  height: 100%;
  min-height: 420px;
  border-radius: var(--radius);
  background: var(--clr-surface-alt);
}
@media (max-width: 900px) {
  .contact-grid {
    grid-template-columns: 1fr;
  }
}
</style>
