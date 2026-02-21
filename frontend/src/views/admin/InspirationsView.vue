<template>
  <div>
    <div class="admin-header">
      <h1 class="admin-title">Inspiracje</h1>
      <label class="btn btn--primary btn--sm">
        + Dodaj zdjęcia
        <input
          type="file"
          @change="uploadImages"
          accept="image/*"
          multiple
          hidden
        />
      </label>
    </div>

    <p class="upload-hint text-muted" v-if="uploading">
      Przesyłanie {{ uploadCount }} zdjęć...
    </p>

    <div class="insp-grid" v-if="items.length">
      <div v-for="(item, idx) in items" :key="item._id" class="insp-card">
        <img :src="item.image" class="insp-card__img" />
        <div class="insp-card__actions">
          <button
            @click="remove(item._id)"
            class="btn btn--ghost btn--sm"
            style="color: var(--clr-danger)"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
    <p v-else class="text-muted" style="padding: var(--sp-lg)">
      Brak inspiracji. Kliknij „+ Dodaj zdjęcia" aby dodać.
    </p>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const items = ref([]);
const uploading = ref(false);
const uploadCount = ref(0);

const fetchAll = async () => {
  try {
    const { data } = await axios.get("/api/inspirations");
    items.value = data;
  } catch (e) {}
};

const uploadImages = async (e) => {
  const files = e.target.files;
  if (!files.length) return;
  uploading.value = true;
  uploadCount.value = files.length;
  const fd = new FormData();
  for (const f of files) fd.append("images", f);
  try {
    const { data } = await axios.post("/api/admin/upload/multiple", fd);
    for (const d of data) {
      await axios.post("/api/inspirations/admin", {
        image: d.url,
        order: items.value.length,
      });
    }
    fetchAll();
  } catch (err) {
    alert("Błąd uploadu");
  } finally {
    uploading.value = false;
    e.target.value = "";
  }
};

const remove = async (id) => {
  if (!confirm("Usunąć zdjęcie?")) return;
  try {
    await axios.delete(`/api/inspirations/admin/${id}`);
    fetchAll();
  } catch (e) {
    alert("Błąd");
  }
};

onMounted(fetchAll);
</script>

<style scoped>
.admin-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--sp-md);
}
.admin-title {
  font-family: var(--font-body);
  font-size: var(--fs-xl);
  font-weight: 600;
}
.upload-hint {
  margin-bottom: var(--sp-sm);
  font-size: var(--fs-sm);
}
.insp-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: var(--sp-xs);
}
.insp-card {
  position: relative;
  border-radius: var(--radius);
  overflow: hidden;
}
.insp-card__img {
  width: 100%;
  aspect-ratio: 1;
  object-fit: cover;
  display: block;
}
.insp-card__actions {
  position: absolute;
  top: 6px;
  right: 6px;
  opacity: 0;
  transition: opacity var(--dur-fast) var(--ease);
}
.insp-card:hover .insp-card__actions {
  opacity: 1;
}
.insp-card__actions .btn {
  background: rgba(0, 0, 0, 0.6);
  color: white !important;
  border-radius: 50%;
  width: 28px;
  height: 28px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
}
</style>
