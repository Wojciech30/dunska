<template>
  <div class="rte">
    <div class="rte__toolbar">
      <button type="button" class="btn btn--ghost btn--sm" @click="exec('bold')">
        B
      </button>
      <button type="button" class="btn btn--ghost btn--sm" @click="exec('italic')">
        I
      </button>
      <button type="button" class="btn btn--ghost btn--sm" @click="exec('insertUnorderedList')">
        Lista
      </button>
      <button type="button" class="btn btn--ghost btn--sm" @click="exec('formatBlock', '<blockquote>')">
        Cytat
      </button>
      <button type="button" class="btn btn--ghost btn--sm" @click="exec('formatBlock', '<h2>')">
        H2
      </button>
      <button type="button" class="btn btn--ghost btn--sm" @click="insertLink">
        Link
      </button>
      <button type="button" class="btn btn--ghost btn--sm" @click="exec('removeFormat')">
        Wyczyść
      </button>
      <button type="button" class="btn btn--ghost btn--sm" @click="exec('undo')">
        Cofnij
      </button>
      <button type="button" class="btn btn--ghost btn--sm" @click="exec('redo')">
        Ponów
      </button>
      <label class="rte__preview-toggle">
        <input type="checkbox" v-model="previewMode" />
        Podgląd
      </label>
    </div>

    <div
      v-show="!previewMode"
      ref="editorRef"
      class="rte__editor"
      contenteditable="true"
      :data-placeholder="placeholder || 'Wpisz treść...'"
      @input="emitUpdate"
      @blur="emitUpdate"
    ></div>

    <div
      v-show="previewMode"
      class="rte__preview"
      v-html="modelValue || '<p class=&quot;text-muted&quot;>Brak treści.</p>'"
    ></div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";

const props = defineProps({
  modelValue: { type: String, default: "" },
  placeholder: { type: String, default: "" },
});
const emit = defineEmits(["update:modelValue"]);

const editorRef = ref(null);
const previewMode = ref(false);

const emitUpdate = () => {
  if (!editorRef.value) return;
  const html = editorRef.value.innerHTML || "";
  emit("update:modelValue", html);
};

const setEditorValue = (value) => {
  if (!editorRef.value) return;
  if (editorRef.value.innerHTML !== value) {
    editorRef.value.innerHTML = value || "";
  }
};

const exec = (command, value = null) => {
  if (!editorRef.value) return;
  editorRef.value.focus();
  document.execCommand(command, false, value);
  emitUpdate();
};

const insertLink = () => {
  const url = window.prompt("Podaj adres URL");
  if (!url) return;
  exec("createLink", url);
};

watch(
  () => props.modelValue,
  (value) => setEditorValue(value || ""),
);

watch(previewMode, (isPreview) => {
  if (!isPreview) {
    setEditorValue(props.modelValue || "");
  }
});

onMounted(() => setEditorValue(props.modelValue || ""));
</script>

<style scoped>
.rte {
  display: grid;
  gap: var(--sp-xs);
}
.rte__toolbar {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  padding: 8px;
  border: 1px solid var(--clr-border-light);
  border-radius: var(--radius);
  background: var(--clr-surface);
}
.rte__editor,
.rte__preview {
  min-height: 220px;
  border: 1px solid var(--clr-border-light);
  border-radius: var(--radius);
  padding: var(--sp-md);
  background: var(--clr-surface);
  line-height: 1.7;
}
.rte__editor:empty::before {
  content: attr(data-placeholder);
  color: var(--clr-text-muted);
}
.rte__preview-toggle {
  margin-left: auto;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: var(--fs-xs);
}
.rte__preview :deep(p),
.rte__preview :deep(ul),
.rte__preview :deep(blockquote) {
  margin-bottom: 0.8em;
}
.rte__preview :deep(blockquote) {
  border-left: 3px solid var(--clr-border);
  padding-left: 12px;
  color: var(--clr-text-muted);
}
</style>
