
import { Builder, By, until } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome.js';
import { expect } from 'chai';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe('Login Test for Hemie', function () {
  this.timeout(60000);
  let driver;
  let userDataDir;

  before(async function () {
    userDataDir = path.join(__dirname, `chrome-profile-${Date.now()}`);
    fs.mkdirSync(userDataDir, { recursive: true });

    const options = new chrome.Options();
    options.addArguments('--headless=new');
    options.addArguments('--no-sandbox');
    options.addArguments('--disable-dev-shm-usage');
    options.addArguments(`--user-data-dir=${userDataDir}`);

    driver = await new Builder()
      .forBrowser('chrome')
      .setChromeOptions(options)
      .build();
  });
  
  
  it('should log in successfully', async function () {
    await driver.get('https://hemie.se/');

    await driver.wait(until.elementLocated(By.xpath('//*[contains(@class, "header-btn primary")]')), 20000);
    await driver.findElement(By.xpath('//*[contains(@class, "header-btn primary-button")]')).click();

    await driver.wait(until.elementLocated(By.css('input[name="email"]')), 20000);
    await driver.findElement(By.css('input[name="email"]')).sendKeys('anastasia.tereshko+32@solveit.dev');
    await driver.findElement(By.css('input[name="password"]')).sendKeys('Hejsan123!');
    await driver.findElement(By.css('button[type="submit"]')).click();

    await driver.wait(until.elementLocated(By.xpath('//*[contains(@class, "greeting")]')), 20000);

    const greeting = await driver.findElement(By.xpath('//*[contains(@class, "greeting")]')).getText();
    expect(greeting).to.contain('Hej'); // Пример: проверить, что в приветствии есть слово Hej
  });

  after(async function () {
    if (driver) {
      await driver.quit();
    }
    fs.rmSync(userDataDir, { recursive: true, force: true });
  });

});
