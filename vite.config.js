import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      utils: path.resolve(__dirname, 'src/utils/index.js'),
      constants: path.resolve(__dirname, 'src/constants/index.js'),
      events: 'eventemitter3'
    },
  },
});
