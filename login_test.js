console.log("�� Тест стартовал...");
const chrome = require('selenium-webdriver/chrome');

const { Builder } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const path = require('path');

// Указываем путь к chromedriver вручную
const service = new chrome.ServiceBuilder('/usr/local/bin/chromedriver').build();
chrome.setDefaultService(service);

const options = new chrome.Options();
options.addArguments('--headless');
options.addArguments('--no-sandbox');
options.addArguments('--disable-dev-shm-usage');

const driver = new Builder()
  .forBrowser('chrome')
  .setChromeOptions(options)
  .build();

module.exports = driver;

(async function hemieLogin() {
    
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
