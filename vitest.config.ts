
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: "./app/__tests__/setup.ts",
    include: ['app/**/*.test.ts', 'app/**/*.spec.ts', 'app/**/*.test.tsx', 'app/**/*.spec.tsx'],
  },
});
