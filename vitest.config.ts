import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    exclude: ['tests/**/*.spec.ts'],
    setupFiles: ['./src/test/setup.ts'],
    exclude: ['tests/e2e/**', '**/node_modules/**'],
    threads: true,
    maxThreads: 4,
    minThreads: 2,
    cache: {
      dir: './node_modules/.vitest',
    },
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'tests/**/*.spec.ts',
        'node_modules/**',
        'dist/**',
        '**/*.d.ts',
        '**/*.test.ts',
        '**/*.spec.ts',
        '**/*.config.ts',
        '**/*.config.js',
      ],
    },
    watch: false,
    testTimeout: 10000,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}); 