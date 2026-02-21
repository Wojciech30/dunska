<template>
  <section class="cta section">
    <div class="container">
      <div class="cta__card">
        <span class="cta__eyebrow">Zainteresowana?</span>
        <h2 class="font-display cta__title">
          Zapytaj o dostępność wybranego produktu
        </h2>
        <p class="cta__sub">
          Napisz do nas — chętnie pomożemy z wyborem rozmiaru, koloru czy
          fasonu.
        </p>
        <button class="btn btn--accent btn--lg" @click="openInquiry">
          Zapytaj o dostępność
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
const openInquiry = () => {
  window.dispatchEvent(new CustomEvent("open-inquiry"));
};
</script>

<style scoped>
.cta__card {
  background: var(--clr-surface-alt);
  text-align: center;
  padding: var(--sp-2xl) var(--sp-lg);
  border-radius: var(--radius-lg);
  border: 1px solid var(--clr-border-light);
}

.cta__eyebrow {
  display: block;
  font-size: var(--fs-xs);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: var(--clr-accent);
  margin-bottom: var(--sp-sm);
}

.cta__title {
  font-size: var(--fs-2xl);
  max-width: 500px;
  margin: 0 auto var(--sp-md);
}

.cta__sub {
  color: var(--clr-text-muted);
  font-size: var(--fs-md);
  max-width: 420px;
  margin: 0 auto var(--sp-lg);
}
</style>
