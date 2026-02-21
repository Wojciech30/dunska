<template>
  <div>
    <div class="admin-header">
      <h1 class="admin-title">Zapytania</h1>
      <button @click="exportCSV" class="btn btn--secondary btn--sm">
        Eksport CSV
      </button>
    </div>

    <table class="admin-table" v-if="inquiries.length">
      <thead>
        <tr>
          <th>Data</th>
          <th>Imię</th>
          <th>Kontakt</th>
          <th>Marka</th>
          <th>Zainteresowania</th>
          <th>Akcje</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="i in inquiries" :key="i._id">
          <td class="text-muted" style="font-size: var(--fs-sm)">
            {{ formatDate(i.createdAt) }}
          </td>
          <td>
            <strong>{{ i.name }}</strong>
          </td>
          <td style="font-size: var(--fs-sm)">
            <div v-if="i.email">{{ i.email }}</div>
            <div v-if="i.phone">{{ i.phone }}</div>
          </td>
          <td>{{ i.brand || "—" }}</td>
          <td>
            <span
              v-for="int in i.interests"
              :key="int"
              class="tag"
              style="margin: 2px"
              >{{ int }}</span
            >
            <span v-if="i.size" class="tag" style="margin: 2px">{{
              i.size
            }}</span>
          </td>
          <td class="actions">
            <button @click="selected = i" class="btn btn--ghost btn--sm">
              Szczegóły
            </button>
            <button
              @click="remove(i._id)"
              class="btn btn--ghost btn--sm"
              style="color: var(--clr-danger)"
            >
              Usuń
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <p v-else class="text-muted" style="padding: var(--sp-lg)">Brak zapytań.</p>

    <!-- Detail Modal -->
    <Teleport to="body">
      <transition name="modal">
        <div
          v-if="selected"
          class="modal-backdrop"
          @click.self="selected = null"
        >
          <div class="detail-modal">
            <button class="detail-modal__close" @click="selected = null">
              ×
            </button>
            <h2
              style="
                font-family: var(--font-body);
                font-size: var(--fs-lg);
                font-weight: 600;
                margin-bottom: var(--sp-md);
              "
            >
              Szczegóły zapytania
            </h2>
            <div class="detail-row">
              <span class="label">Data</span
              ><span>{{ formatDate(selected.createdAt) }}</span>
            </div>
            <div class="detail-row">
              <span class="label">Imię</span><span>{{ selected.name }}</span>
            </div>
            <div class="detail-row">
              <span class="label">Email</span
              ><span>{{ selected.email || "—" }}</span>
            </div>
            <div class="detail-row">
              <span class="label">Telefon</span
              ><span>{{ selected.phone || "—" }}</span>
            </div>
            <div class="detail-row">
              <span class="label">Marka</span
              ><span>{{ selected.brand || "—" }}</span>
            </div>
            <div class="detail-row">
              <span class="label">Rozmiar</span
              ><span>{{ selected.size || "—" }}</span>
            </div>
            <div class="detail-row">
              <span class="label">Zainteresowania</span>
              <div>
                <span
                  v-for="int in selected.interests"
                  :key="int"
                  class="tag"
                  style="margin: 2px"
                  >{{ int }}</span
                >
              </div>
            </div>
            <div class="detail-row">
              <span class="label">Wiadomość</span>
              <p class="detail-msg">{{ selected.message || "Brak" }}</p>
            </div>
          </div>
        </div>
      </transition>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const inquiries = ref([]);
const selected = ref(null);

const formatDate = (d) => new Date(d).toLocaleString("pl-PL");
const fetch = async () => {
  try {
    const { data } = await axios.get("/api/inquiries/admin");
    inquiries.value = data;
  } catch (e) {}
};
const remove = async (id) => {
  if (!confirm("Usunąć?")) return;
  try {
    await axios.delete(`/api/inquiries/admin/${id}`);
    fetch();
  } catch (e) {
    alert("Błąd");
  }
};

const exportCSV = async () => {
  try {
    const { data } = await axios.get("/api/inquiries/admin/export", {
      responseType: "blob",
    });
    const url = window.URL.createObjectURL(new Blob([data]));
    const a = document.createElement("a");
    a.href = url;
    a.download = "zapytania.csv";
    a.click();
  } catch (e) {
    alert("Błąd eksportu");
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
  gap: var(--sp-xs);
}

.modal-backdrop {
  position: fixed;
  inset: 0;
  background: var(--clr-overlay);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  padding: var(--sp-md);
}
.detail-modal {
  background: var(--clr-surface);
  width: 100%;
  max-width: 480px;
  padding: var(--sp-lg);
  border-radius: var(--radius-lg);
  position: relative;
  max-height: 90vh;
  overflow-y: auto;
}
.detail-modal__close {
  position: absolute;
  top: var(--sp-sm);
  right: var(--sp-sm);
  font-size: 1.5rem;
  color: var(--clr-text-muted);
}
.detail-row {
  margin-bottom: var(--sp-sm);
}
.detail-msg {
  background: var(--clr-surface-alt);
  padding: var(--sp-sm);
  border-radius: var(--radius);
  font-size: var(--fs-sm);
  white-space: pre-wrap;
  margin-top: 4px;
}
</style>
