import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
    fixturesFolder: "cypress/e2e/fixtures",
  },
});
