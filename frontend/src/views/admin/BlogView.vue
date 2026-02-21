<template>
  <div>
    <div class="admin-header">
      <h1 class="admin-title">Blog</h1>
      <router-link
        :to="{ name: 'admin-blog-new' }"
        class="btn btn--primary btn--sm"
        >+ Nowy wpis</router-link
      >
    </div>

    <table class="admin-table" v-if="posts.length">
      <thead>
        <tr>
          <th>Data</th>
          <th>Tytuł</th>
          <th>Kategoria</th>
          <th>Status</th>
          <th>Akcje</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="p in posts" :key="p._id">
          <td class="text-muted" style="font-size: var(--fs-sm)">
            {{ formatDate(p.createdAt) }}
          </td>
          <td>
            <strong>{{ p.title }}</strong>
          </td>
          <td>
            <span class="tag">{{ p.category || "—" }}</span>
          </td>
          <td>
            <span
              :class="p.published ? 'tag' : 'tag'"
              :style="{
                background: p.published
                  ? 'var(--clr-success)'
                  : 'var(--clr-border)',
                color: p.published ? 'white' : 'var(--clr-text-muted)',
              }"
              >{{ p.published ? "Opublikowany" : "Szkic" }}</span
            >
          </td>
          <td class="actions">
            <router-link
              :to="{ name: 'admin-blog-edit', params: { id: p._id } }"
              class="btn btn--ghost"
              >Edytuj</router-link
            >
            <button
              @click="deletePost(p._id)"
              class="btn btn--ghost"
              style="color: var(--clr-danger)"
            >
              Usuń
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <p v-else class="text-muted" style="padding: var(--sp-lg)">
      Brak wpisów. Dodaj pierwszy.
    </p>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const posts = ref([]);
const formatDate = (d) => new Date(d).toLocaleDateString("pl-PL");
const fetch = async () => {
  try {
    const { data } = await axios.get("/api/blog/admin/all");
    posts.value = data;
  } catch (e) {}
};
const deletePost = async (id) => {
  if (!confirm("Usunąć wpis?")) return;
  try {
    await axios.delete(`/api/blog/admin/${id}`);
    fetch();
  } catch (e) {
    alert("Błąd");
  }
};
onMounted(fetch);
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
.actions {
  display: flex;
  gap: var(--sp-sm);
}
</style>
