import { Builder, By, until } from "selenium-webdriver";
import chrome from "selenium-webdriver/chrome.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { path as chromedriverPath } from "chromedriver";

console.log("Use chromedriver:", chromedriverPath);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe("Login Test for Hemie", function () {
  this.timeout(60000);
  let driver;
  let userDataDir;

  before(async function () {
    this.timeout(60000);
    console.log("Create folder...");
    userDataDir = path.join(__dirname, `chrome-profile-${Date.now()}`);
    fs.mkdirSync(userDataDir, { recursive: true });
    console.log("Set up ChromeOptions...");

    const options = new chrome.Options();
    options.addArguments("--headless=new");
    options.addArguments("--disable-gpu");
    options.addArguments("--no-sandbox");
    options.addArguments("--disable-dev-shm-usage");
    options.addArguments(`--user-data-dir=${userDataDir}`);
    options.addArguments("--window-size=1920,1080");
    options.addArguments("--remote-debugging-port=9222");
    options.addArguments("--disable-blink-features=AutomationControlled");
    console.log("Launch WebDriver...");

    try {
      driver = await new Builder()
        .forBrowser("chrome")
        .setChromeOptions(options)
        .build();
      console.log("WebDriver launched!");
    } catch (error) {
      console.error("Failed to launch WebDriver:", error);
      console.error(error.stack);
      throw error;
    }
  });

  it("should log in successfully", async function () {
    await driver.get("https://hemie.se/");

    await driver.wait(
      until.elementLocated(
        By.xpath('//*[contains(@class, "header-btn primary")]')
      ),
      20000
    );
    await driver
      .findElement(
        By.xpath('//*[contains(@class, "header-btn primary-button")]')
      )
      .click();

    await driver.wait(
      until.elementLocated(By.css('input[name="email"]')),
      20000
    );
    const userEmail = "anastasia.tereshko+32@solveit.dev";
    const userPassword = "Hejsan123!";
    await driver.findElement(By.css('input[name="email"]')).sendKeys(userEmail);
    await driver
      .findElement(By.css('input[name="password"]'))
      .sendKeys(userPassword);
    await driver.findElement(By.css('button[type="submit"]')).click();

    await driver.wait(async () => {
      const url = await driver.getCurrentUrl();
      return url.includes("/home");
    }, 30000);

    const finalUrl = await driver.getCurrentUrl();
    console.log("Redirected to:", finalUrl);

    if (!finalUrl.includes("/home")) {
      throw new Error(`Unexpected redirect URL after login: ${finalUrl}`);
    }

    await driver.wait(
      until.elementLocated(By.className("default_avatar_icon")),
      20000
    );

    console.log("Test Login Test for Hemie passed");
  });

  after(async function () {
    await driver.quit();
    setTimeout(() => {
      if (fs.existsSync(userDataDir)) {
        fs.rmSync(userDataDir, { recursive: true, force: true });
        console.log(`Deleted Chrome profile: ${userDataDir}`);
      }
    }, 5000);
  });
});
