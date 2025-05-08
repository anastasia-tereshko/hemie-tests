console.log("������ Тест стартовал...");
import { Builder, By, until } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome.js';
import { expect } from 'chai';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { path as chromedriverPath } from 'chromedriver';

console.log('Use chromedriver:', chromedriverPath);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe('Load data', function () {
  let driver;
  let userDataDir;

  before(async function () {
    this.timeout(60000);
    console.log('Create folder...');
    userDataDir = path.join(__dirname, `chrome-profile-${Date.now()}`);
    fs.mkdirSync(userDataDir, { recursive: true });
    console.log('Set up ChromeOptions...');

    const options = new chrome.Options();
    options.addArguments('--headless=new');
    options.addArguments('--disable-gpu');
    options.addArguments('--no-sandbox');
    options.addArguments('--disable-dev-shm-usage');
    options.addArguments(`--user-data-dir=${userDataDir}`);
    options.addArguments('--window-size=1920,1080');
    options.addArguments('--remote-debugging-port=9222');
    options.addArguments('--disable-blink-features=AutomationControlled');
    console.log('Launch WebDriver...');

    try {
      driver = await new Builder()
        .forBrowser('chrome')
        .setChromeOptions(options)
        .build();
      console.log('WebDriver launched!');
    } catch (error) {
      console.error('Failed to launch WebDriver:', error);
      console.error(error.stack);
      throw error;
    }
  });

/*const chrome = require('selenium-webdriver/chrome');
const { Builder, By, until } = require('selenium-webdriver');
(async function hemieLogin() {
  let options = new chrome.Options();
  //options.addArguments('--headless');
  //options.addArguments('--no-sandbox');
  //options.addArguments('--disable-dev-shm-usage');

  let driver = await new Builder()
    .forBrowser('chrome')
    .setChromeOptions(options)
    .build();*/
    
  try {
    await driver.get('https://hemie.se/');

    // Wait and click the "Log in" button (in the upper right corner)
    await driver.wait(until.elementLocated(By.xpath('//*[contains(@class, "header-btn primary")]')), 20000);
    await driver.findElement(By.xpath('//*[contains(@class, "header-btn primary-button")]')).click();

    // Waiting for login form to load
    await driver.wait(until.elementLocated(By.css('input[name="email"]')), 20000);

    // Enter email
    await driver.findElement(By.css('input[name="email"]')).sendKeys('anastasia.tereshko+32@solveit.dev');

    // Enter password
    await driver.findElement(By.css('input[name="password"]')).sendKeys('Hejsan123!');

    // Click the "Log in" button
    await driver.findElement(By.css('button[type="submit"]')).click();

    // Wait until some element appears indicating a successful login. (greeting)
    await driver.wait(until.elementLocated(By.xpath('//*[contains(@class, "greeting")]')), 20000);

    console.log('✅ Login successful!');
  } catch (error) {
    console.error('❌ Error while logging in:', error);
  } finally {
    await driver.sleep(3000); // wait 3 sec to see the result
    await driver.quit();
  }
})();