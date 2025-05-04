import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    exclude: ['node_modules/**', 'dist/**'],
    include: ['src/**/*.{test,spec}.{js,jsx,ts,tsx}'],
    setupFiles: ['./src/test/setup.ts'],
    threads: true,
    maxThreads: 4,
    minThreads: 2,
    cache: {
      dir: './node_modules/.vitest',
    },
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      exclude: [
        'node_modules/**',
        'dist/**',
        '**/*.d.ts',
        '**/*.config.ts',
        '**/*.config.js',
        'src/test/**',
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