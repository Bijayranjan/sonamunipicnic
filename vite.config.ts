
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Set base to './' so it works on any GitHub project URL or custom domain
  base: './',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  }
});
