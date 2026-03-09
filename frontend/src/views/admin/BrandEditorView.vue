<template>
  <div class="editor">
    <h1 class="admin-title">{{ isEdit ? "Edytuj markę" : "Nowa marka" }}</h1>

    <div v-if="loading" class="state-box text-muted">Ładowanie danych marki...</div>
    <div v-else-if="loadError" class="state-box state-box--error">
      <p>{{ loadError }}</p>
      <button type="button" class="btn btn--ghost btn--sm" @click="fetchBrand">
        Spróbuj ponownie
      </button>
    </div>

    <form v-else @submit.prevent="save" class="editor-form">
      <div class="editor-grid">
        <div class="editor-main">
          <div class="form-group">
            <label class="label">Nazwa</label
            ><input v-model="form.name" class="input" required />
          </div>
          <div class="form-group">
            <label class="label">Opis</label>
            <RichTextEditor
              v-model="form.description"
              placeholder="Opisz markę językiem korzyści dla klienta."
            />
          </div>
        </div>
        <div class="editor-side">
          <div class="side-card">
            <div class="form-group">
              <label class="label">Kolejność</label
              ><input v-model.number="form.order" type="number" class="input" />
            </div>
            <div class="form-group">
              <label class="modal__check"
                ><input type="checkbox" v-model="form.isPremium" />
                Premium</label
              >
            </div>
            <div class="form-group" v-if="form.isPremium">
              <label class="label">Etykieta Premium</label
              ><input v-model="form.premiumLabel" class="input" />
            </div>
          </div>
          <div class="side-card">
            <label class="label">Logo</label>
            <img v-if="form.logo" :src="form.logo" class="preview-img" />
            <input
              type="file"
              @change="(e) => upload(e, 'logo')"
              accept="image/*"
            />
          </div>
          <div class="side-card">
            <label class="label">Hero image</label>
            <img
              v-if="form.heroImage"
              :src="form.heroImage"
              class="preview-img"
            />
            <input
              type="file"
              @change="(e) => upload(e, 'heroImage')"
              accept="image/*"
            />
          </div>
          <div class="side-card">
            <label class="label">Galeria</label>
            <div class="gallery-preview">
              <img
                v-for="(g, i) in form.gallery"
                :key="i"
                :src="g"
                class="gallery-thumb"
              />
            </div>
            <input
              type="file"
              @change="uploadGallery"
              accept="image/*"
              multiple
            />
          </div>
        </div>
      </div>
      <div class="editor-actions">
        <button type="submit" class="btn btn--primary" :disabled="saving">
          {{ saving ? "Zapisywanie..." : "Zapisz" }}
        </button>
        <router-link :to="{ name: 'admin-brands' }" class="btn btn--ghost"
          >Anuluj</router-link
        >
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
import RichTextEditor from "@/components/RichTextEditor.vue";

const route = useRoute();
const router = useRouter();
const isEdit = computed(() => !!route.params.id);
const saving = ref(false);
const loading = ref(false);
const loadError = ref("");

const form = ref({
  name: "",
  description: "",
  order: 0,
  isPremium: false,
  premiumLabel: "Premium selection",
  logo: "",
  heroImage: "",
  gallery: [],
});

const upload = async (e, field) => {
  const file = e.target.files[0];
  if (!file) return;
  const fd = new FormData();
  fd.append("image", file);
  try {
    const { data } = await axios.post("/api/admin/upload", fd);
    form.value[field] = data.url;
  } catch (err) {
    alert("Błąd uploadu");
  }
};

const uploadGallery = async (e) => {
  const files = e.target.files;
  if (!files.length) return;
  const fd = new FormData();
  for (const f of files) fd.append("images", f);
  try {
    const { data } = await axios.post("/api/admin/upload/multiple", fd);
    form.value.gallery.push(...data.map((d) => d.url));
  } catch (err) {
    alert("Błąd");
  }
};

const save = async () => {
  saving.value = true;
  try {
    if (isEdit.value)
      await axios.put(`/api/brands/admin/${route.params.id}`, form.value);
    else await axios.post("/api/brands/admin", form.value);
    router.push({ name: "admin-brands" });
  } catch (e) {
    alert("Błąd zapisywania");
  } finally {
    saving.value = false;
  }
};

const fetchBrand = async () => {
  if (!isEdit.value) return;
  loading.value = true;
  loadError.value = "";
  try {
    const { data } = await axios.get(`/api/brands/admin/${route.params.id}`);
    Object.assign(form.value, data);
  } catch (e) {
    loadError.value =
      e.response?.data?.error ||
      "Nie udało się pobrać danych marki. Odśwież stronę lub spróbuj ponownie.";
  } finally {
    loading.value = false;
  }
};

onMounted(async () => {
  await fetchBrand();
});
</script>

<style scoped>
.admin-title {
  font-family: var(--font-body);
  font-size: var(--fs-xl);
  font-weight: 600;
  margin-bottom: var(--sp-lg);
}
.editor-grid {
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: var(--sp-lg);
}
.editor-main,
.editor-side {
  display: flex;
  flex-direction: column;
  gap: var(--sp-md);
}
.side-card {
  background: var(--clr-surface);
  border: 1px solid var(--clr-border-light);
  border-radius: var(--radius);
  padding: var(--sp-md);
}
.form-group {
  margin-bottom: var(--sp-sm);
}
.preview-img {
  max-width: 100%;
  max-height: 120px;
  margin-bottom: var(--sp-xs);
  border-radius: var(--radius);
}
.gallery-preview {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 8px;
}
.gallery-thumb {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 4px;
}
.editor-actions {
  margin-top: var(--sp-lg);
  display: flex;
  gap: var(--sp-sm);
}
.state-box {
  margin-bottom: var(--sp-md);
  padding: var(--sp-md);
  background: var(--clr-surface);
  border: 1px solid var(--clr-border-light);
  border-radius: var(--radius);
}
.state-box--error {
  border-color: color-mix(in srgb, var(--clr-danger) 35%, var(--clr-border-light));
  color: var(--clr-danger);
  display: grid;
  gap: var(--sp-sm);
}
.modal__check {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: var(--fs-sm);
  cursor: pointer;
}
.modal__check input {
  accent-color: var(--clr-accent);
}
@media (max-width: 768px) {
  .editor-grid {
    grid-template-columns: 1fr;
  }
}
</style>
