import { createRouter, createWebHistory } from "vue-router";
import { useAdminStore } from "@/stores/admin";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: () => import("../views/PublicLayout.vue"),
      children: [
        {
          path: "",
          name: "home",
          component: () => import("../views/HomeView.vue"),
        },
        {
          path: "marki",
          name: "brands",
          component: () => import("../views/BrandsView.vue"),
        },
        {
          path: "marki/:slug",
          name: "brand-detail",
          component: () => import("../views/BrandDetailView.vue"),
          props: true,
        },
        {
          path: "o-nas",
          name: "about",
          component: () => import("../views/AboutView.vue"),
        },
        {
          path: "blog",
          name: "blog",
          component: () => import("../views/BlogListingView.vue"),
        },
        {
          path: "blog/:slug",
          name: "blog-post",
          component: () => import("../views/BlogPostView.vue"),
          props: true,
        },
        {
          path: "inspiracje",
          name: "inspirations",
          component: () => import("../views/InspirationsView.vue"),
        },
        {
          path: "social-media",
          name: "social-media",
          component: () => import("../views/SocialMediaView.vue"),
        },
        {
          path: ":pathMatch(.*)*",
          name: "not-found",
          component: () => import("../views/NotFoundView.vue"),
        },
      ],
    },
    {
      path: "/admin",
      name: "admin-login",
      component: () => import("../views/admin/LoginView.vue"),
    },
    {
      path: "/admin/dashboard",
      component: () => import("../views/admin/AdminLayout.vue"),
      meta: { requiresAuth: true },
      children: [
        {
          path: "",
          name: "admin-dashboard",
          component: () => import("../views/admin/DashboardView.vue"),
        },
        {
          path: "brands",
          name: "admin-brands",
          component: () => import("../views/admin/BrandsView.vue"),
        },
        {
          path: "brands/new",
          name: "admin-brand-new",
          component: () => import("../views/admin/BrandEditorView.vue"),
        },
        {
          path: "brands/edit/:id",
          name: "admin-brand-edit",
          component: () => import("../views/admin/BrandEditorView.vue"),
          props: true,
        },
        {
          path: "blog",
          name: "admin-blog",
          component: () => import("../views/admin/BlogView.vue"),
        },
        {
          path: "blog/new",
          name: "admin-blog-new",
          component: () => import("../views/admin/BlogEditorView.vue"),
        },
        {
          path: "blog/edit/:id",
          name: "admin-blog-edit",
          component: () => import("../views/admin/BlogEditorView.vue"),
          props: true,
        },
        {
          path: "inspirations",
          name: "admin-inspirations",
          component: () => import("../views/admin/InspirationsView.vue"),
        },
        {
          path: "inquiries",
          name: "admin-inquiries",
          component: () => import("../views/admin/InquiriesView.vue"),
        },
        {
          path: "settings",
          name: "admin-settings",
          component: () => import("../views/admin/SettingsView.vue"),
        },
      ],
    },
  ],
});

// Navigation guard
router.beforeEach((to, from, next) => {
  const adminStore = useAdminStore();
  if (to.meta.requiresAuth && !adminStore.isAuthenticated) {
    next("/admin");
  } else {
    next();
  }
});

export default router;
