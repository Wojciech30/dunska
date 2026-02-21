<template>
  <nav
    class="nav"
    :class="{ 'nav--scrolled': scrolled, 'nav--open': drawerOpen }"
  >
    <div class="container nav__inner">
      <router-link
        to="/"
        class="nav__logo font-display"
        @click="drawerOpen = false"
      >
        Duńska
      </router-link>

      <div class="nav__links" :class="{ 'nav__links--open': drawerOpen }">
        <router-link
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          class="nav__link"
          @click="drawerOpen = false"
          >{{ link.label }}</router-link
        >

        <button class="btn btn--accent btn--sm nav__cta" @click="openInquiry">
          Zapytaj o dostępność
        </button>
      </div>

      <button
        class="nav__burger"
        :class="{ 'nav__burger--open': drawerOpen }"
        @click="drawerOpen = !drawerOpen"
        aria-label="Menu"
      >
        <span></span>
        <span></span>
      </button>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const scrolled = ref(false);
const drawerOpen = ref(false);

const links = [
  { label: "Marki", to: "/marki" },
  { label: "O nas", to: "/o-nas" },
  { label: "Blog", to: "/blog" },
  { label: "Inspiracje", to: "/inspiracje" },
  { label: "Social Media", to: "/social-media" },
];

const onScroll = () => {
  scrolled.value = window.scrollY > 40;
};
const openInquiry = () => {
  drawerOpen.value = false;
  window.dispatchEvent(new CustomEvent("open-inquiry"));
};

onMounted(() => window.addEventListener("scroll", onScroll, { passive: true }));
onUnmounted(() => window.removeEventListener("scroll", onScroll));
</script>

<style scoped>
.nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: var(--nav-h);
  z-index: 900;
  transition:
    background var(--dur) var(--ease),
    box-shadow var(--dur) var(--ease),
    height var(--dur) var(--ease);
}

.nav--scrolled {
  background: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  box-shadow: 0 1px 0 var(--clr-border-light);
}

.nav__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
}

.nav__logo {
  font-size: 1.6rem;
  letter-spacing: 0.08em;
  color: var(--clr-text);
  z-index: 910;
}

.nav__links {
  display: flex;
  align-items: center;
  gap: var(--sp-lg);
}

.nav__link {
  font-size: var(--fs-xs);
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--clr-text-muted);
  position: relative;
  padding: 4px 0;
}
.nav__link::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 1px;
  background: var(--clr-accent);
  transition: width var(--dur) var(--ease);
}
.nav__link:hover,
.nav__link.router-link-active {
  color: var(--clr-text);
}
.nav__link:hover::after,
.nav__link.router-link-active::after {
  width: 100%;
}

/* Hamburger */
.nav__burger {
  display: none;
  flex-direction: column;
  gap: 6px;
  z-index: 910;
  padding: 8px;
}
.nav__burger span {
  display: block;
  width: 24px;
  height: 1.5px;
  background: var(--clr-text);
  transition: all var(--dur) var(--ease);
  transform-origin: center;
}
.nav__burger--open span:first-child {
  transform: rotate(45deg) translate(2.5px, 2.5px);
}
.nav__burger--open span:last-child {
  transform: rotate(-45deg) translate(2.5px, -2.5px);
}

@media (max-width: 900px) {
  .nav__burger {
    display: flex;
  }

  .nav__links {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    width: 320px;
    max-width: 85vw;
    background: var(--clr-surface);
    flex-direction: column;
    align-items: flex-start;
    padding: calc(var(--nav-h) + var(--sp-lg)) var(--sp-lg) var(--sp-lg);
    gap: var(--sp-md);
    transform: translateX(100%);
    transition: transform var(--dur) var(--ease);
    box-shadow: var(--shadow-xl);
  }
  .nav__links--open {
    transform: translateX(0);
  }

  .nav__link {
    font-size: var(--fs-sm);
  }
  .nav__cta {
    margin-top: var(--sp-md);
    width: 100%;
  }

  /* Backdrop */
  .nav--open::before {
    content: "";
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: var(--clr-overlay);
    z-index: 905;
  }
}
</style>
