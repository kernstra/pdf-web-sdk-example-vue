import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  // Lets browser code read KERNSTRA_* variables (typed in src/vite-env.d.ts).
  envPrefix: ['VITE_', 'KERNSTRA_'],
});
