<template>
  <div class="admin-login">
    <div class="login-card anim-fade-up">
      <h1 class="font-display login-title">Duńska</h1>
      <p class="login-sub text-muted">Panel administracyjny</p>

      <form @submit.prevent="handleLogin" class="login-form">
        <input
          v-model="password"
          type="password"
          class="input"
          placeholder="Hasło administratora"
          required
          autofocus
        />
        <button
          type="submit"
          class="btn btn--primary btn--full"
          :disabled="loading"
        >
          {{ loading ? "Logowanie..." : "Zaloguj się" }}
        </button>
        <p v-if="error" class="login-error">{{ error }}</p>
      </form>
      <div class="login-footer">
        <router-link to="/" class="text-muted">
          Powrót do strony głównej
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAdminStore } from "@/stores/admin";

const router = useRouter();
const adminStore = useAdminStore();

const password = ref("");
const loading = ref(false);
const error = ref("");

const handleLogin = async () => {
  loading.value = true;
  error.value = "";
  try {
    const ok = await adminStore.login(password.value);
    if (ok) router.push("/admin/dashboard");
    else error.value = "Nieprawidłowe hasło.";
  } catch (e) {
    error.value = "Nieprawidłowe hasło.";
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.admin-login {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--clr-bg);
  padding: var(--sp-md);
}

.login-card {
  background: var(--clr-surface);
  padding: var(--sp-xl);
  border-radius: var(--radius-lg);
  border: 1px solid var(--clr-border-light);
  width: 100%;
  max-width: 380px;
  text-align: center;
  box-shadow: var(--shadow-lg);
}

.login-title {
  font-size: var(--fs-2xl);
  letter-spacing: 0.06em;
  margin-bottom: 4px;
}
.login-sub {
  margin-bottom: var(--sp-lg);
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: var(--sp-sm);
}

.login-error {
  color: var(--clr-danger);
  font-size: var(--fs-sm);
}
</style>
