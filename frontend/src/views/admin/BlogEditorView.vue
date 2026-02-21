<template>
  <div class="editor">
    <h1 class="admin-title">{{ isEdit ? "Edytuj wpis" : "Nowy wpis" }}</h1>

    <form @submit.prevent="save" class="editor-form">
      <div class="editor-grid">
        <div class="editor-main">
          <div class="form-group">
            <label class="label">Tytuł</label
            ><input v-model="form.title" class="input" required />
          </div>
          <div class="form-group">
            <label class="label">Treść (HTML)</label
            ><textarea
              v-model="form.content"
              class="textarea"
              rows="16"
            ></textarea>
          </div>
          <div class="form-group">
            <label class="label">Zajawka</label
            ><textarea
              v-model="form.excerpt"
              class="textarea"
              rows="3"
            ></textarea>
          </div>
        </div>
        <div class="editor-side">
          <div class="side-card">
            <label class="modal__check"
              ><input type="checkbox" v-model="form.published" />
              Opublikowany</label
            >
          </div>
          <div class="side-card">
            <div class="form-group">
              <label class="label">Kategoria</label
              ><input v-model="form.category" class="input" />
            </div>
            <div class="form-group">
              <label class="label">Marka</label>
              <select v-model="form.brand" class="select">
                <option :value="null">Brak</option>
                <option v-for="b in brands" :key="b._id" :value="b._id">
                  {{ b.name }}
                </option>
              </select>
            </div>
          </div>
          <div class="side-card">
            <label class="label">Zdjęcie główne</label>
            <img
              v-if="form.coverImage"
              :src="form.coverImage"
              class="preview-img"
            />
            <input type="file" @change="upload" accept="image/*" />
          </div>
          <div class="side-card">
            <div class="form-group">
              <label class="label">Meta Title (SEO)</label
              ><input v-model="form.metaTitle" class="input" />
            </div>
            <div class="form-group">
              <label class="label">Meta Description</label
              ><textarea
                v-model="form.metaDescription"
                class="textarea"
                rows="2"
              ></textarea>
            </div>
          </div>
        </div>
      </div>
      <div class="editor-actions">
        <button type="submit" class="btn btn--primary" :disabled="saving">
          {{ saving ? "Zapisywanie..." : "Zapisz" }}
        </button>
        <router-link :to="{ name: 'admin-blog' }" class="btn btn--ghost"
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

const route = useRoute();
const router = useRouter();
const isEdit = computed(() => !!route.params.id);
const saving = ref(false);
const brands = ref([]);

const form = ref({
  title: "",
  content: "",
  excerpt: "",
  coverImage: "",
  category: "",
  brand: null,
  published: false,
  metaTitle: "",
  metaDescription: "",
});

const upload = async (e) => {
  const file = e.target.files[0];
  if (!file) return;
  const fd = new FormData();
  fd.append("image", file);
  try {
    const { data } = await axios.post("/api/admin/upload", fd);
    form.value.coverImage = data.url;
  } catch (err) {
    alert("Błąd");
  }
};

const save = async () => {
  saving.value = true;
  try {
    if (isEdit.value)
      await axios.put(`/api/blog/admin/${route.params.id}`, form.value);
    else await axios.post("/api/blog/admin", form.value);
    router.push({ name: "admin-blog" });
  } catch (e) {
    alert("Błąd zapisywania");
  } finally {
    saving.value = false;
  }
};

onMounted(async () => {
  try {
    const { data } = await axios.get("/api/brands");
    brands.value = data;
  } catch (e) {}
  if (isEdit.value) {
    try {
      const { data } = await axios.get(`/api/blog/${route.params.id}`);
      Object.assign(form.value, data);
      if (data.brand?._id) form.value.brand = data.brand._id;
    } catch (e) {}
  }
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
.editor-actions {
  margin-top: var(--sp-lg);
  display: flex;
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
