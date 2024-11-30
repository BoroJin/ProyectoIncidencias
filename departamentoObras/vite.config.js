import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/static/', // Asegúrate de que los archivos estáticos tengan el prefijo correcto
  build: {
    outDir: './dist',
    assetsDir: '',
  },
  plugins: [react()],
});