import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: './', // Asegúrate de que los archivos estáticos tengan un prefijo
  build: {
    outDir: './dist',
    assetsDir: 'assets',
  },
  plugins: [react()],
});
