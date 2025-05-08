const { Builder, By, Key, until } = require('selenium-webdriver');

(async function hemieLogin() {
  let driver = await new Builder().forBrowser('chrome').build();
  try {
    await driver.get('https://hemie.se/');

    // Wait and click the "Log in" button (in the upper right corner)
    await driver.wait(until.elementLocated(By.xpath('//*[contains(@class, "header-btn primary")]')), 10000);
    await driver.findElement(By.xpath('//*[contains(@class, "header-btn primary-button")]')).click();

    // Waiting for login form to load
    await driver.wait(until.elementLocated(By.css('input[name="email"]')), 10000);

    // Enter email
    await driver.findElement(By.css('input[name="email"]')).sendKeys('anastasia.tereshko+32@solveit.dev');

    // Enter password
    await driver.findElement(By.css('input[name="password"]')).sendKeys('Hejsan123!');

    // Click the "Log in" button
    await driver.findElement(By.css('button[type="submit"]')).click();

    // Wait until some element appears indicating a successful login. (greeting)
    await driver.wait(until.elementLocated(By.xpath('//*[contains(@class, "greeting")]')), 10000);

    console.log('✅ Login successful!');
  } catch (error) {
    console.error('❌ Error while logging in:', error);
  } finally {
    await driver.sleep(3000); // wait 3 sec to see the result
    await driver.quit();
  }
})();