<template>
  <div class="not-found">
    <div class="not-found__content">
      <h1 class="font-display">404</h1>
      <p>Strona, której szukasz, nie istnieje.</p>
      <router-link to="/" class="btn btn--primary"
        >Wróć na stronę główną</router-link
      >
    </div>
  </div>
</template>

<style scoped>
.not-found {
  min-height: calc(100vh - var(--nav-h));
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: var(--sp-lg);
}
.not-found__content h1 {
  font-size: 8rem;
  line-height: 1;
  color: var(--clr-border);
  margin-bottom: var(--sp-sm);
}
.not-found__content p {
  color: var(--clr-text-muted);
  margin-bottom: var(--sp-lg);
  font-size: var(--fs-md);
}
</style>
