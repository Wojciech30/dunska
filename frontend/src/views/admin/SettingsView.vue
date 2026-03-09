<template>
  <div class="editor">
    <h1 class="admin-title">Ustawienia strony głównej</h1>

    <div v-if="loading" class="text-muted" style="padding: var(--sp-lg)">
      Ładowanie...
    </div>

    <form v-else @submit.prevent="save" class="editor-form">
      <div class="settings-grid">
        <div class="side-card">
          <h3 class="card-heading">Sekcja Hero</h3>
          <div class="form-group">
            <label class="label">Claim</label
            ><input v-model="form.heroClaim" class="input" />
          </div>
          <div class="form-group">
            <label class="label">Zdjęcie Hero</label>
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
        </div>

        <div class="side-card">
          <h3 class="card-heading">Sekcje strony głównej</h3>
          <p class="text-muted reorder-hint">
            Przeciągnij i upuść, aby zmienić kolejność sekcji.
          </p>
          <div
            v-for="(sec, idx) in form.homepageSections"
            :key="sec.type"
            class="section-row"
            :draggable="true"
            @dragstart="onDragStart(idx)"
            @dragover.prevent
            @drop="onDrop(idx)"
          >
            <span class="section-row__handle">⋮⋮</span>
            <span class="section-row__name">{{ sectionLabel(sec.type) }}</span>
            <label class="section-row__toggle"
              ><input type="checkbox" v-model="sec.enabled" /> Wł.</label
            >
          </div>
        </div>

        <div class="side-card">
          <h3 class="card-heading">Ustawienia techniczne</h3>
          <div class="form-group">
            <label class="label">Stopka</label>
            <input v-model="form.footerText" class="input" />
          </div>
        </div>
      </div>

      <div class="editor-actions">
        <button type="submit" class="btn btn--primary" :disabled="saving">
          {{ saving ? "Zapisywanie..." : "Zapisz ustawienia" }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const form = ref({});
const loading = ref(true);
const saving = ref(false);
const draggedIndex = ref(null);

const sectionLabels = {
  hero: "Baner główny",
  brands: "Marki",
  inspirations: "Inspiracje",
  about: "O nas",
  cta: "Sekcja CTA",
  blog: "Blog",
  social: "Social media",
};

const sectionLabel = (type) => sectionLabels[type] || type;

const normalizeSectionOrder = () => {
  if (!Array.isArray(form.value.homepageSections)) return;
  form.value.homepageSections.forEach((sec, idx) => {
    sec.order = idx;
  });
};

const fetchData = async () => {
  loading.value = true;
  try {
    const { data } = await axios.get("/api/settings");
    form.value = data;
    if (!Array.isArray(form.value.homepageSections)) {
      form.value.homepageSections = [];
    }
    form.value.homepageSections.sort((a, b) => a.order - b.order);
    normalizeSectionOrder();
  } catch (e) {
  } finally {
    loading.value = false;
  }
};

const upload = async (e, field) => {
  const file = e.target.files[0];
  if (!file) return;
  const fd = new FormData();
  fd.append("image", file);
  try {
    const { data } = await axios.post("/api/admin/upload", fd);
    form.value[field] = data.url;
  } catch (err) {
    alert("Błąd");
  }
};

const onDragStart = (idx) => {
  draggedIndex.value = idx;
};

const onDrop = (dropIndex) => {
  if (draggedIndex.value === null || draggedIndex.value === dropIndex) return;
  const item = form.value.homepageSections.splice(draggedIndex.value, 1)[0];
  form.value.homepageSections.splice(dropIndex, 0, item);
  draggedIndex.value = null;
  normalizeSectionOrder();
};

const save = async () => {
  saving.value = true;
  try {
    normalizeSectionOrder();
    await axios.put("/api/settings/admin", form.value);
    alert("Ustawienia zapisane.");
  } catch (e) {
    alert("Błąd");
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
.preview-img {
  max-width: 100%;
  max-height: 120px;
  margin-bottom: var(--sp-xs);
  border-radius: var(--radius);
}

.section-row {
  display: flex;
  align-items: center;
  gap: var(--sp-xs);
  padding: 10px 0;
  border-bottom: 1px solid var(--clr-border-light);
}
.section-row:last-child {
  border-bottom: none;
}
.section-row__handle {
  color: var(--clr-text-light);
}
.section-row__name {
  flex: 1;
  text-transform: capitalize;
  font-weight: 500;
  font-size: var(--fs-sm);
}
.section-row__toggle {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: var(--fs-xs);
}
.section-row__toggle input {
  accent-color: var(--clr-accent);
}
.reorder-hint {
  margin-bottom: var(--sp-sm);
  font-size: var(--fs-sm);
}

.editor-actions {
  margin-top: var(--sp-lg);
}

@media (max-width: 768px) {
  .settings-grid {
    grid-template-columns: 1fr;
  }
}
</style>
