<template>
  <div class="editor">
    <h1 class="admin-title">Edycja strony O nas</h1>

    <p v-if="loading" class="text-muted state-msg">Ładowanie...</p>
    <p v-else-if="error" class="state-msg state-msg--error">{{ error }}</p>

    <form v-else @submit.prevent="save" class="editor-form">
      <div class="settings-grid">
        <div class="side-card">
          <h3 class="card-heading">Treść</h3>
          <div class="form-group">
            <label class="label">Tytuł</label>
            <input v-model="form.aboutTitle" class="input" />
          </div>
          <div class="form-group">
            <label class="label">Krótki opis (sekcja na stronie głównej)</label>
            <textarea v-model="form.aboutPreview" class="textarea" rows="3"></textarea>
          </div>
          <div class="form-group">
            <label class="label">Pełna treść strony O nas</label>
            <RichTextEditor v-model="form.aboutContent" placeholder="Historia marki, wartości, doświadczenie." />
          </div>
        </div>

        <div class="side-card">
          <h3 class="card-heading">Zdjęcie</h3>
          <img v-if="form.aboutImage" :src="form.aboutImage" class="preview-img" />
          <input type="file" @change="upload" accept="image/*" />
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
import RichTextEditor from "@/components/RichTextEditor.vue";

const form = ref({
  aboutTitle: "",
  aboutPreview: "",
  aboutContent: "",
  aboutImage: "",
});
const loading = ref(true);
const saving = ref(false);
const error = ref("");

const fetchData = async () => {
  loading.value = true;
  error.value = "";
  try {
    const { data } = await axios.get("/api/settings");
    form.value.aboutTitle = data.aboutTitle || "";
    form.value.aboutPreview = data.aboutPreview || "";
    form.value.aboutContent = data.aboutContent || "";
    form.value.aboutImage = data.aboutImage || "";
  } catch (e) {
    error.value = "Nie udało się pobrać danych strony O nas.";
  } finally {
    loading.value = false;
  }
};

const upload = async (e) => {
  const file = e.target.files[0];
  if (!file) return;
  const fd = new FormData();
  fd.append("image", file);
  try {
    const { data } = await axios.post("/api/admin/upload", fd);
    form.value.aboutImage = data.url;
  } catch (err) {
    alert("Błąd uploadu");
  }
};

const save = async () => {
  saving.value = true;
  try {
    await axios.put("/api/settings/admin", form.value);
    alert("Zapisano stronę O nas.");
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
  grid-template-columns: 1.5fr 1fr;
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
.preview-img {
  max-width: 100%;
  max-height: 220px;
  margin-bottom: var(--sp-xs);
  border-radius: var(--radius);
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
