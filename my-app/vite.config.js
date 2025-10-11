import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist'
  },
  server: {
    port: 5173,
    proxy: {
      // dev only; in production the BE serves the built FE
      '/api': 'http://localhost:40000'
    }
  }
});

