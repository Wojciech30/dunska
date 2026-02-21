<template>
  <div>
    <div class="admin-header">
      <h1 class="admin-title">Marki</h1>
      <router-link
        :to="{ name: 'admin-brand-new' }"
        class="btn btn--primary btn--sm"
        >+ Dodaj markę</router-link
      >
    </div>

    <table class="admin-table" v-if="brands.length">
      <thead>
        <tr>
          <th>Kolejność</th>
          <th>Logo</th>
          <th>Nazwa</th>
          <th>Premium</th>
          <th>Akcje</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="b in brands" :key="b._id">
          <td>{{ b.order }}</td>
          <td><img v-if="b.logo" :src="b.logo" class="thumb" /></td>
          <td>
            <strong>{{ b.name }}</strong>
          </td>
          <td>
            <span v-if="b.isPremium" class="tag tag--premium">Premium</span>
          </td>
          <td class="actions">
            <router-link
              :to="{ name: 'admin-brand-edit', params: { id: b._id } }"
              class="btn btn--ghost"
              >Edytuj</router-link
            >
            <button
              @click="deleteBrand(b._id)"
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
      Brak marek. Dodaj pierwszą.
    </p>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const brands = ref([]);
const fetch = async () => {
  try {
    const { data } = await axios.get("/api/brands");
    brands.value = data;
  } catch (e) {}
};
const deleteBrand = async (id) => {
  if (!confirm("Usunąć markę?")) return;
  try {
    await axios.delete(`/api/brands/admin/${id}`);
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
.thumb {
  width: 48px;
  height: 36px;
  object-fit: contain;
  border-radius: 4px;
  background: var(--clr-surface-alt);
}
.actions {
  display: flex;
  gap: var(--sp-sm);
}
</style>
