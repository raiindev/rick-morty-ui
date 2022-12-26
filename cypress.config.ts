import { defineConfig } from "cypress"

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      config.baseUrl = "http://localhost:3000"
      config.defaultCommandTimeout = 10000
      // implement node event listeners here
    },
  },
  video: false,
})
