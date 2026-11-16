<script setup lang="ts">
import { defineAsyncComponent, shallowRef } from 'vue';
import PdfDropzone from './components/PdfDropzone.vue';

const FRAMEWORK = 'Vue';

// Its chunk, and the SDK with it, loads when the first PDF is chosen.
const DocumentViewer = defineAsyncComponent(() => import('./components/DocumentViewer.vue'));

// shallowRef: a File is held as it is, not made reactive.
const file = shallowRef<File>();
const error = shallowRef<string>();

function pick(picked: File) {
  const isPdf = picked.type === 'application/pdf' || picked.name.toLowerCase().endsWith('.pdf');
  error.value = isPdf ? undefined : `${picked.name} is not a PDF.`;
  if (isPdf) file.value = picked;
}

// Back to the landing page, saying why.
function fail(failed: File, reason: unknown) {
  console.error(reason);
  error.value = `Could not open ${failed.name}: ${reason instanceof Error ? reason.message : reason}`;
  file.value = undefined;
}
</script>

<template>
  <div class="app">
    <!-- The landing page until a PDF is chosen. -->
    <PdfDropzone v-if="!file" :framework="FRAMEWORK" :error="error" @file="pick" />
    <template v-else>
      <header class="app-header">
        <h1 class="app-title">
          <a class="brand" href="https://kernstra.com/web-sdk">
            <span class="brand-mark" aria-hidden="true" />
            Kernstra PDF Web SDK
          </a>
          <span>
            <span class="framework-mark" aria-hidden="true" />
            {{ FRAMEWORK }}
          </span>
        </h1>
        <div class="app-nav">
          <span class="app-file">{{ file.name }}</span>
          <button type="button" @click="file = undefined">Open another PDF</button>
        </div>
      </header>
      <DocumentViewer :file="file" @error="fail" />
    </template>
  </div>
</template>
