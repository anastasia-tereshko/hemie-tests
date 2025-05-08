console.log("������ Тест стартовал...");

const chrome = require('selenium-webdriver/chrome');
const { Builder, By, until } = require('selenium-webdriver');

// Указываем путь к ChromeDriver вручную
const service = new chrome.ServiceBuilder('/usr/local/bin/chromedriver').build();
chrome.setDefaultService(service);

(async function hemieLogin() {
  let options = new chrome.Options();
  options.addArguments('--headless');
  options.addArguments('--no-sandbox');
  options.addArguments('--disable-dev-shm-usage');

  let driver = await new Builder()
    .forBrowser('chrome')
    .setChromeOptions(options)
    .build();

  try {
    await driver.get('https://hemie.se/');

    await driver.wait(until.elementLocated(By.xpath('//*[contains(@class, "header-btn primary")]')), 20000);
    await driver.findElement(By.xpath('//*[contains(@class, "header-btn primary-button")]')).click();

    await driver.wait(until.elementLocated(By.css('input[name="email"]')), 20000);
    await driver.findElement(By.css('input[name="email"]')).sendKeys('anastasia.tereshko+32@solveit.dev');
    await driver.findElement(By.css('input[name="password"]')).sendKeys('Hejsan123!');
    await driver.findElement(By.css('button[type="submit"]')).click();

    await driver.wait(until.elementLocated(By.xpath('//*[contains(@class, "greeting")]')), 20000);

    console.log('✅ Login successful!');
  } catch (error) {
    console.error('❌ Error while logging in:', error);
  } finally {
    await driver.sleep(3000);
    await driver.quit();
  }
})();