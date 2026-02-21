<template>
  <Teleport to="body">
    <transition name="modal">
      <div v-if="visible" class="modal-backdrop" @click.self="close">
        <div class="modal" :class="{ 'modal--success': submitted }">
          <button class="modal__close" @click="close" aria-label="Zamknij">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M15 5L5 15M5 5l10 10"
                stroke="currentColor"
                stroke-width="1.5"
              />
            </svg>
          </button>

          <!-- Success State -->
          <div v-if="submitted" class="modal__success anim-fade-up">
            <div class="modal__success-icon">✓</div>
            <h2 class="font-display">Dziękujemy!</h2>
            <p class="text-muted">
              Twoje zapytanie zostało wysłane.<br />Skontaktujemy się w ciągu
              24h.
            </p>
            <button class="btn btn--primary" @click="close">Zamknij</button>
          </div>

          <!-- Step 1: Choose channel -->
          <div v-else-if="!showForm" class="modal__step anim-fade-up">
            <h2 class="font-display">Jak możemy pomóc?</h2>
            <p class="text-muted">Wybierz preferowaną formę kontaktu.</p>

            <div class="modal__options">
              <a
                :href="dmUrl"
                target="_blank"
                rel="noopener"
                class="modal__option"
              >
                <span class="modal__option-label">Napisz na Instagramie</span>
                <span class="modal__option-arrow">↗</span>
              </a>
              <button
                class="modal__option modal__option--highlight"
                @click="showForm = true"
              >
                <span class="modal__option-label"
                  >Zostaw kontakt — oddzwonimy</span
                >
                <span class="modal__option-arrow">→</span>
              </button>
            </div>
          </div>

          <!-- Step 2: Contact form -->
          <div v-else class="modal__step anim-fade-up">
            <button
              class="btn btn--ghost modal__back"
              @click="showForm = false"
            >
              ← Wróć
            </button>
            <h2 class="font-display">Zostaw kontakt</h2>
            <p class="text-muted" style="margin-bottom: var(--sp-md)">
              Odezwiemy się najszybciej jak to możliwe.
            </p>

            <form @submit.prevent="submit" class="modal__form">
              <input
                v-model="form.name"
                class="input"
                placeholder="Imię *"
                required
              />

              <div class="modal__row">
                <input
                  v-model="form.email"
                  class="input"
                  type="email"
                  placeholder="Email"
                />
                <input
                  v-model="form.phone"
                  class="input"
                  type="tel"
                  placeholder="Telefon"
                />
              </div>
              <p class="modal__hint">Wymagany min. jeden kanał kontaktu.</p>

              <div class="modal__field">
                <span class="label">Zainteresowania</span>
                <div class="modal__checks">
                  <label
                    v-for="opt in interestsOptions"
                    :key="opt"
                    class="modal__check"
                  >
                    <input
                      type="checkbox"
                      :value="opt"
                      v-model="form.interests"
                    />
                    <span>{{ opt }}</span>
                  </label>
                </div>
              </div>

              <select v-model="form.size" class="select">
                <option value="">Rozmiar (opcjonalnie)</option>
                <option v-for="s in sizes" :key="s" :value="s">{{ s }}</option>
              </select>

              <textarea
                v-model="form.message"
                class="textarea"
                rows="3"
                placeholder="Dodatkowa wiadomość..."
              ></textarea>

              <label class="modal__consent">
                <input v-model="form.consent" type="checkbox" required />
                <span
                  >Wyrażam zgodę na przetwarzanie danych osobowych (RODO)
                  *</span
                >
              </label>

              <button
                type="submit"
                class="btn btn--primary btn--full"
                :disabled="submitting"
              >
                {{ submitting ? "Wysyłanie..." : "Wyślij zapytanie" }}
              </button>

              <p v-if="error" class="modal__error">{{ error }}</p>
            </form>
          </div>
        </div>
      </div>
    </transition>
  </Teleport>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";
import axios from "axios";

const props = defineProps({ visible: Boolean });
const emit = defineEmits(["close"]);

const showForm = ref(false);
const submitting = ref(false);
const submitted = ref(false);
const error = ref("");
const dmUrl = ref("https://ig.me/m/dunska_concept_store");

const interestsOptions = [
  "Sukienka",
  "Bluzka",
  "Sweter",
  "Spodnie",
  "Płaszcz",
  "Nowa kolekcja",
  "Inne",
];
const sizes = ["XS", "S", "M", "L", "XL", "Uniwersalny"];

const form = ref({
  name: "",
  email: "",
  phone: "",
  brand: "",
  interests: [],
  size: "",
  message: "",
  consent: false,
});

const close = () => {
  emit("close");
};
const resetForm = () => {
  showForm.value = false;
  submitted.value = false;
  error.value = "";
  form.value = {
    name: "",
    email: "",
    phone: "",
    brand: "",
    interests: [],
    size: "",
    message: "",
    consent: false,
  };
};

watch(
  () => props.visible,
  (v) => {
    document.body.classList.toggle("modal-open", v);
    if (v) {
      resetForm();
      const savedBrand = localStorage.getItem("inquiry_brand");
      if (savedBrand) {
        form.value.brand = savedBrand;
        localStorage.removeItem("inquiry_brand");
      }
    }
  },
);

const submit = async () => {
  if (!form.value.email && !form.value.phone) {
    error.value = "Podaj telefon lub email.";
    return;
  }
  submitting.value = true;
  error.value = "";
  try {
    await axios.post("/api/inquiries", form.value);
    submitted.value = true;
  } catch (e) {
    error.value = e.response?.data?.error || "Wystąpił błąd. Spróbuj ponownie.";
  } finally {
    submitting.value = false;
  }
};

onMounted(async () => {
  try {
    const { data } = await axios.get("/api/settings");
    if (data.instagramDmUrl) dmUrl.value = data.instagramDmUrl;
  } catch (e) {}
});
</script>

<style scoped>
/* Transition */
.modal-enter-active,
.modal-leave-active {
  transition: opacity var(--dur) var(--ease);
}
.modal-enter-active .modal,
.modal-leave-active .modal {
  transition:
    transform var(--dur) var(--ease),
    opacity var(--dur) var(--ease);
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
.modal-enter-from .modal {
  transform: translateY(20px) scale(0.97);
  opacity: 0;
}
.modal-leave-to .modal {
  transform: translateY(10px);
  opacity: 0;
}

.modal-backdrop {
  position: fixed;
  inset: 0;
  background: var(--clr-overlay);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  padding: var(--sp-sm);
}

.modal {
  position: relative;
  background: var(--clr-surface);
  width: 100%;
  max-width: 480px;
  max-height: 90vh;
  overflow-y: auto;
  padding: var(--sp-xl) var(--sp-lg);
  border-radius: var(--radius-lg);
}

.modal__close {
  position: absolute;
  top: var(--sp-sm);
  right: var(--sp-sm);
  padding: 8px;
  color: var(--clr-text-muted);
  transition: color var(--dur-fast) var(--ease);
}
.modal__close:hover {
  color: var(--clr-text);
}

h2 {
  text-align: center;
  margin-bottom: 8px;
}
.modal__step > .text-muted {
  text-align: center;
}

/* Options */
.modal__options {
  display: flex;
  flex-direction: column;
  gap: var(--sp-sm);
  margin-top: var(--sp-lg);
}

.modal__option {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px 20px;
  border: 1px solid var(--clr-border);
  border-radius: var(--radius);
  font-size: var(--fs-base);
  transition: all var(--dur-fast) var(--ease);
  text-align: left;
  width: 100%;
}
.modal__option:hover {
  border-color: var(--clr-text);
  background: var(--clr-surface-alt);
}
.modal__option--highlight {
  border-color: var(--clr-accent);
  background: var(--clr-accent-light);
}
.modal__option--highlight:hover {
  background: var(--clr-accent);
  color: white;
  border-color: var(--clr-accent);
}

.modal__option-arrow {
  font-size: 1.2rem;
  color: var(--clr-text-muted);
}

/* Form */
.modal__form {
  display: flex;
  flex-direction: column;
  gap: var(--sp-sm);
}
.modal__row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--sp-sm);
}
.modal__hint {
  font-size: var(--fs-xs);
  color: var(--clr-text-light);
  margin-top: -8px;
}

.modal__field {
  margin-top: 4px;
}
.modal__checks {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
}
.modal__check {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: var(--fs-sm);
  cursor: pointer;
}
.modal__check input[type="checkbox"] {
  accent-color: var(--clr-accent);
  width: 16px;
  height: 16px;
}

.modal__consent {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  font-size: var(--fs-xs);
  color: var(--clr-text-muted);
  cursor: pointer;
  line-height: 1.4;
}
.modal__consent input {
  margin-top: 2px;
  accent-color: var(--clr-accent);
}

.modal__error {
  color: var(--clr-danger);
  font-size: var(--fs-sm);
  text-align: center;
}

.modal__back {
  margin-bottom: var(--sp-sm);
}

/* Success */
.modal--success {
  text-align: center;
}
.modal__success-icon {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: var(--clr-success);
  color: white;
  font-size: 1.4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto var(--sp-md);
}
.modal__success h2 {
  margin-bottom: var(--sp-sm);
}
.modal__success p {
  margin-bottom: var(--sp-lg);
}
</style>
