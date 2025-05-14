/// <reference types="node" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src")
    }
  },
  build: {
    commonjsOptions: {
      transformMixedEsModules: true,
    },
    rollupOptions: {
      onwarn(warning, warn) {
        // Ignore "Module is externalized for browser compatibility" warnings
        if (
          warning.code === 'UNRESOLVED_IMPORT' && 
          warning.message.includes('@/components/ui/')
        ) {
          return;
        }
        warn(warning);
      },
    },
  },
  optimizeDeps: {
    include: [
      '@tanstack/react-query',
      'react',
      'react-dom',
      'react-router-dom'
    ]
  }
});
