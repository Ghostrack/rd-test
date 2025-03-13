import { defineNuxtConfig } from "nuxt/config";

/** Nuxt config. */
export default defineNuxtConfig({
  $development: {
    devtools: { enabled: true },
  },
  $env: {
    staging: {},
  },
  $production: {
    routeRules: {
      "/**": { isr: true },
    },
  },
  compatibilityDate: "2025-03-11",
  css              : ["./assets/css/index.css"],
  modules          : ["@nuxt/test-utils/module"],
});
