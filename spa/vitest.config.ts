import { defineVitestConfig } from "@nuxt/test-utils/config";

/** Vitest config. */
export default defineVitestConfig({
  test: {
    globalSetup: "./tests/global-setup.ts",
  },
});
