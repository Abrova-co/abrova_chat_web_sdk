import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    // The UI kit in abrova-chat-ui/ has its own tests and config.
    include: ['test/**/*.test.ts'],
  },
});
