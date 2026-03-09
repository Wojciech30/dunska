<template>
  <div class="editor">
    <h1 class="admin-title">Edycja strony Kontakt</h1>

    <p v-if="loading" class="text-muted state-msg">Ładowanie...</p>
    <p v-else-if="error" class="state-msg state-msg--error">{{ error }}</p>

    <form v-else @submit.prevent="save" class="editor-form">
      <div class="settings-grid">
        <div class="side-card">
          <h3 class="card-heading">Dane kontaktowe</h3>
          <div class="form-group">
            <label class="label">Email</label>
            <input v-model="form.contactEmail" type="email" class="input" />
          </div>
          <div class="form-group">
            <label class="label">Telefon</label>
            <input v-model="form.phone" class="input" />
          </div>
          <div class="form-group">
            <label class="label">Adres</label>
            <input v-model="form.address" class="input" />
          </div>
          <div class="form-group">
            <label class="label">Map URL (embed)</label>
            <input v-model="form.mapUrl" class="input" />
          </div>
        </div>

        <div class="side-card">
          <h3 class="card-heading">Social media</h3>
          <div class="form-group">
            <label class="label">Instagram URL</label>
            <input v-model="form.instagramUrl" class="input" />
          </div>
          <div class="form-group">
            <label class="label">Instagram DM URL</label>
            <input v-model="form.instagramDmUrl" class="input" />
          </div>
          <div class="form-group">
            <label class="label">Facebook URL</label>
            <input v-model="form.facebookUrl" class="input" />
          </div>
        </div>
      </div>

      <div class="editor-actions">
        <button type="submit" class="btn btn--primary" :disabled="saving">
          {{ saving ? "Zapisywanie..." : "Zapisz zmiany" }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const form = ref({
  contactEmail: "",
  phone: "",
  address: "",
  mapUrl: "",
  instagramUrl: "",
  instagramDmUrl: "",
  facebookUrl: "",
});
const loading = ref(true);
const saving = ref(false);
const error = ref("");

const fetchData = async () => {
  loading.value = true;
  error.value = "";
  try {
    const { data } = await axios.get("/api/settings");
    form.value.contactEmail = data.contactEmail || "";
    form.value.phone = data.phone || "";
    form.value.address = data.address || "";
    form.value.mapUrl = data.mapUrl || "";
    form.value.instagramUrl = data.instagramUrl || "";
    form.value.instagramDmUrl = data.instagramDmUrl || "";
    form.value.facebookUrl = data.facebookUrl || "";
  } catch (e) {
    error.value = "Nie udało się pobrać danych kontaktowych.";
  } finally {
    loading.value = false;
  }
};

const save = async () => {
  saving.value = true;
  try {
    await axios.put("/api/settings/admin", form.value);
    alert("Zapisano dane kontaktowe.");
  } catch (e) {
    alert("Błąd zapisu.");
  } finally {
    saving.value = false;
  }
};

onMounted(fetchData);
</script>

<style scoped>
.admin-title {
  font-family: var(--font-body);
  font-size: var(--fs-xl);
  font-weight: 600;
  margin-bottom: var(--sp-lg);
}
.settings-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--sp-md);
}
.side-card {
  background: var(--clr-surface);
  border: 1px solid var(--clr-border-light);
  border-radius: var(--radius);
  padding: var(--sp-md);
}
.card-heading {
  font-family: var(--font-body);
  font-size: var(--fs-base);
  font-weight: 600;
  margin-bottom: var(--sp-md);
  padding-bottom: var(--sp-xs);
  border-bottom: 1px solid var(--clr-border-light);
}
.form-group {
  margin-bottom: var(--sp-sm);
}
.editor-actions {
  margin-top: var(--sp-lg);
}
.state-msg {
  padding: var(--sp-lg);
}
.state-msg--error {
  color: var(--clr-danger);
}
@media (max-width: 900px) {
  .settings-grid {
    grid-template-columns: 1fr;
  }
}
</style>
