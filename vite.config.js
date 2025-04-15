import vue from '@vitejs/plugin-vue';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    // Ce bloc est optionnel en dev, mais utile si tu veux forcer une page 404 custom plus tard
    fs: {
      strict: false,
    },
  }
});

