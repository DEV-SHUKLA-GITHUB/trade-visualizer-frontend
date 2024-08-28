import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import commonjs from 'vite-plugin-commonjs';

export default defineConfig({
  plugins: [
    react(),
    commonjs({
      filter(id) {
        if (id.includes('node_modules/@canvasjs/stockcharts') || id.includes('node_modules/@canvasjs/react-stockcharts')){
          return true;
        }
      },
    }),
  ],
});
