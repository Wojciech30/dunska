<template>
  <div class="admin-layout">
    <aside class="sidebar">
      <router-link to="/" class="sidebar__logo font-display"
        >Duńska</router-link
      >
      <span class="sidebar__label">Panel administracyjny</span>

      <nav class="sidebar__nav">
        <router-link
          :to="{ name: 'admin-dashboard' }"
          class="sidebar__link"
          exact-active-class="sidebar__link--active"
        >
          Dashboard
        </router-link>
        <router-link
          :to="{ name: 'admin-brands' }"
          class="sidebar__link"
          active-class="sidebar__link--active"
        >
          Marki
        </router-link>
        <router-link
          :to="{ name: 'admin-blog' }"
          class="sidebar__link"
          active-class="sidebar__link--active"
        >
          Blog
        </router-link>
        <router-link
          :to="{ name: 'admin-inspirations' }"
          class="sidebar__link"
          active-class="sidebar__link--active"
        >
          Inspiracje
        </router-link>
        <router-link
          :to="{ name: 'admin-inquiries' }"
          class="sidebar__link"
          active-class="sidebar__link--active"
        >
          Zapytania
        </router-link>
        <router-link
          :to="{ name: 'admin-settings' }"
          class="sidebar__link"
          active-class="sidebar__link--active"
        >
          Ustawienia
        </router-link>
      </nav>

      <div class="sidebar__footer">
        <a href="/" class="sidebar__back" target="_blank">↗ Otwórz stronę</a>
        <button class="sidebar__logout" @click="logout">Wyloguj się</button>
      </div>
    </aside>

    <main class="admin-main">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useAdminStore } from "@/stores/admin";

const router = useRouter();
const adminStore = useAdminStore();

const logout = () => {
  adminStore.logout();
  router.push("/admin");
};
</script>

<style scoped>
.admin-layout {
  display: flex;
  min-height: 100vh;
}

.sidebar {
  width: 220px;
  background: var(--clr-text);
  color: rgba(255, 255, 255, 0.7);
  padding: var(--sp-md);
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  position: sticky;
  top: 0;
  height: 100vh;
}

.sidebar__logo {
  font-size: 1.3rem;
  color: white;
  letter-spacing: 0.06em;
  margin-bottom: 2px;
}
.sidebar__label {
  font-size: var(--fs-xs);
  color: rgba(255, 255, 255, 0.25);
  margin-bottom: var(--sp-lg);
}

.sidebar__nav {
  display: flex;
  flex-direction: column;
  gap: 2px;
  flex: 1;
}

.sidebar__link {
  padding: 10px 14px;
  border-radius: var(--radius);
  font-size: var(--fs-sm);
  color: rgba(255, 255, 255, 0.55);
  transition: all var(--dur-fast) var(--ease);
}
.sidebar__link:hover {
  background: rgba(255, 255, 255, 0.06);
  color: white;
}
.sidebar__link--active {
  background: rgba(255, 255, 255, 0.1);
  color: white;
  font-weight: 500;
}

.sidebar__footer {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-top: var(--sp-sm);
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}

.sidebar__back {
  font-size: var(--fs-sm);
  color: rgba(255, 255, 255, 0.45);
  transition: color var(--dur-fast) var(--ease);
}
.sidebar__back:hover {
  color: var(--clr-accent);
}

.sidebar__logout {
  font-size: var(--fs-sm);
  color: rgba(255, 255, 255, 0.3);
  text-align: left;
  transition: color var(--dur-fast) var(--ease);
}
.sidebar__logout:hover {
  color: white;
}

.admin-main {
  flex: 1;
  padding: var(--sp-lg);
  background: var(--clr-bg);
  overflow-y: auto;
}
</style>
