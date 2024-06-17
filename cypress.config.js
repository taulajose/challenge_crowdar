const { defineConfig } = require("cypress");


module.exports = defineConfig({
  defaultCommandTimeout: 6000,
  pageLoadTimeout:60000000 ,
  chromeWebSecurity: false ,
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    //charts: true,
    reportPageTitle: 'Reporte Challenge',
    embeddedScreenshots: true,
    //inlineAssets: true,
    //saveAllAttempts: false,
  },

  "env": {
      "urlLogin": "https://www.saucedemo.com",

    },

  e2e: {
   
    
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
      // implement node event listeners here
    },
  },
});
