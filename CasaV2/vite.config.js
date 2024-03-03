import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import VitePluginSass from 'vite-plugin-sass';

export default defineConfig({
  plugins: [
    react(),
    VitePluginSass(),
  ],
});