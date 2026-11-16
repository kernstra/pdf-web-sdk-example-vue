<!-- Opens its file once: give it :key="file" to switch documents. -->
<script setup lang="ts">
import { onBeforeUnmount, onMounted, useTemplateRef } from 'vue';
import { PDFDocument, PDFViewer } from '@kernstra/pdf-web-sdk';
import { initKernstra } from '../lib/kernstra';

const props = defineProps<{ file: File }>();
const emit = defineEmits<{ error: [file: File, error: unknown] }>();

const el = useTemplateRef<HTMLDivElement>('el');
let doc: PDFDocument | undefined;
let viewer: PDFViewer | undefined;
let unmounted = false;

async function open() {
  await initKernstra();
  const opened = await PDFDocument.fromFile(props.file);
  if (unmounted) return opened.close();
  doc = opened;
  viewer = new PDFViewer(el.value!, doc);
}

onMounted(() => {
  open().catch((error) => {
    if (!unmounted) emit('error', props.file, error);
  });
});

onBeforeUnmount(() => {
  unmounted = true;
  viewer?.destroy();
  void doc?.close();
});
</script>

<template>
  <!-- The container needs a height: .viewer fills what the header leaves. -->
  <div ref="el" class="viewer" />
</template>
