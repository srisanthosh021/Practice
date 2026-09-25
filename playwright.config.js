import { defineConfig, devices } from '@playwright/test';
import { trace } from 'node:console';
require('dotenv').config();

/**
 * @see https://playwright.dev/docs/test-configuration
 */
 
 
const config = ({
  testDir: './tests',
  timeout: 30*1000,
  expect:{
    timeout: 10*1000    // for assertions validations
  } ,
  reporter : "html",  // when you need a report for your tests
  use: {
       actionTimeout: 10 * 1000,
    navigationTimeout: 30 * 1000,
   browserName : "chromium",
   headless : false ,
   screenshot : 'on',
   trace : 'retain-on-failure',

  },

  
 
});
 module.exports = config

