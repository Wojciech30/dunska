import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import "./assets/main.css";

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount("#app");

// Auto-hide scrollbar: show on scroll, hide after 500ms
let scrollTimer = null;
window.addEventListener(
  "scroll",
  () => {
    document.documentElement.classList.add("scrolling");
    clearTimeout(scrollTimer);
    scrollTimer = setTimeout(() => {
      document.documentElement.classList.remove("scrolling");
    }, 500);
  },
  { passive: true },
);
