import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    include: [
      'src/app/queries/stress-tests/tests/*.test.ts',
      'src/app/queries/forecasts/**/*.test.ts',
      'src/app/queries/financial-comp/**/*.test.ts',
    ],
  },
});
