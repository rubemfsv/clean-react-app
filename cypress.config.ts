import { defineConfig } from "cypress";

export default defineConfig({
  chromeWebSecurity: false,
  viewportWidth: 1200,
  viewportHeight: 660,

  env: {
    baseUrl: "http://localhost:8081",
    user: {
      login: "test@test.com",
      password: "12345",
    },
  },

  retries: {
    runMode: 1,
  },

  defaultCommandTimeout: 40000,
  pageLoadTimeout: 50000,

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
