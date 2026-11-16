<!-- The landing page: takes a PDF from the file picker or a drop. -->
<script setup lang="ts">
import { ref } from 'vue';

defineProps<{
  /** The framework this example is written in, shown on the page. */
  framework: string;
  /** Why the last file did not open, if it did not. */
  error?: string;
}>();
const emit = defineEmits<{ file: [file: File] }>();

const dragging = ref(false);

function onChange(event: Event) {
  const input = event.target as HTMLInputElement;
  const file = input.files?.[0];
  input.value = ''; // so choosing the same file again fires `change`
  if (file) emit('file', file);
}

function onDrop(event: DragEvent) {
  dragging.value = false;
  const file = event.dataTransfer?.files[0];
  if (file) emit('file', file);
}
</script>

<template>
  <main class="landing">
    <div class="landing-lockup" aria-hidden="true">
      <span class="brand-mark" />
      <span>+</span>
      <span class="framework-mark" />
    </div>
    <a class="brand" href="https://kernstra.com/web-sdk">Kernstra PDF Web SDK</a>
    <p class="landing-framework">{{ framework }} example</p>
    <h1>Open a PDF to view, annotate and edit it</h1>
    <p class="landing-lead">
      The Kernstra PDF Web SDK running in a {{ framework }} app. Your file stays in the browser:
      nothing is uploaded.
    </p>
    <!-- .prevent on dragover allows the drop; on drop it keeps the browser
         from opening the file itself. -->
    <label
      class="dropzone"
      :data-dragging="dragging"
      @dragover.prevent="dragging = true"
      @dragleave="dragging = false"
      @drop.prevent="onDrop"
    >
      <input type="file" accept="application/pdf,.pdf" @change="onChange" />
      <strong>Drop a PDF here</strong>
      <span>or <u>choose a file</u></span>
    </label>
    <p v-if="error" class="landing-error" role="alert">{{ error }}</p>
    <p class="landing-links">
      <a href="https://kernstra.com/web-sdk/get-started">Get started</a>
      <a href="https://kernstra.com/docs/web-sdk">Documentation</a>
      <a href="https://kernstra.com/">kernstra.com</a>
    </p>
  </main>
</template>
