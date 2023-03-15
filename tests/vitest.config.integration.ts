import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["__tests__/integration/**/*.test.js"],
    setupFiles: ["dotenv/config", "functions/setup.js"],
    threads: false,
  },
});
