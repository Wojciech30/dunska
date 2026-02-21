<template>
  <footer class="footer" style="padding: var(--sp-md) 0">
    <div
      class="container footer__inner"
      style="justify-content: center; text-align: center"
    >
      <div
        class="footer__left"
        style="flex-direction: column; align-items: center"
      >
        <span class="footer__copy">{{
          settings.footerText ||
          `© ${new Date().getFullYear()} Duńska Concept Store`
        }}</span>
      </div>
    </div>
  </footer>
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
.footer {
  background: var(--clr-text);
  color: rgba(255, 255, 255, 0.5);
  padding: var(--sp-lg) 0;
  margin-top: var(--sp-section);
}

.footer__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--sp-md);
  flex-wrap: wrap;
}

.footer__left {
  display: flex;
  align-items: center;
  gap: var(--sp-md);
}

.footer__logo {
  font-size: 1.3rem;
  color: white;
  letter-spacing: 0.06em;
}

.footer__copy {
  font-size: var(--fs-xs);
  color: rgba(255, 255, 255, 0.3);
}

.footer__links {
  display: flex;
  gap: var(--sp-md);
  flex-wrap: wrap;
}
.footer__links a {
  font-size: var(--fs-xs);
  color: rgba(255, 255, 255, 0.5);
  transition: color var(--dur-fast) var(--ease);
}
.footer__links a:hover {
  color: white;
}

.footer__admin {
  font-size: var(--fs-xs);
  color: rgba(255, 255, 255, 0.15);
}
.footer__admin:hover {
  color: rgba(255, 255, 255, 0.4);
}

@media (max-width: 768px) {
  .footer__inner {
    flex-direction: column;
    text-align: center;
  }
  .footer__left {
    flex-direction: column;
    gap: 4px;
  }
  .footer__links {
    justify-content: center;
  }
}
</style>
