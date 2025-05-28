import { Builder, By, until } from "selenium-webdriver";
import chrome from "selenium-webdriver/chrome.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { path as chromedriverPath } from "chromedriver";

console.log("Use chromedriver:", chromedriverPath);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe("Login Logout DEV", function () {
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
    this.timeout(20000);
    await driver.get("https://dev.hemie.org/");

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
    const userEmail = "veronika.malahovskaya+27053@solveit.dev";
    const userPassword = "Test12345!";
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

    await driver.findElement(By.className("default_avatar_icon")).click();

    await driver.wait(
      until.elementLocated(By.xpath('//span[contains(text(), "Logga ut")]')),
      20000
    );

    await driver
      .findElement(By.xpath('//span[contains(text(), "Logga ut")]'))
      .click();

    console.log("Test Login Logout DEV passed");
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

describe("Accept cookies DEV", function () {
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

  it("should accept cookies successfully", async function () {
    this.timeout(20000);
    await driver.get("https://dev.hemie.org/");

    await driver.wait(
      until.elementLocated(By.className("manager-cookie__wrapper")),
      20000
    );

    await driver
      .findElement(By.xpath('//span[contains(text(), "Godkänn alla")]'))
      .click();

    let elements = await driver.findElements(
      By.className("manager-cookie__wrapper")
    );
    if (elements.length === 0) {
      console.log("Pop up is gone");
    }

    await driver.navigate().refresh();

    if (elements.length === 0) {
      console.log("Pop up is gone");
    }

    console.log("Test Accept cookies DEV passed");
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

describe("Decline cookies DEV", function () {
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

  it("should decline cookies successfully", async function () {
    this.timeout(20000);
    await driver.get("https://dev.hemie.org/");

    await driver.wait(
      until.elementLocated(By.className("manager-cookie__wrapper")),
      20000
    );

    await driver
      .findElement(By.xpath('//span[contains(text(), "Hantera cookies")]'))
      .click();

    await driver.wait(
      until.elementLocated(
        By.xpath(
          '//h2[contains(text(), "Anpassa dina samtyckesinställningar")]'
        )
      ),
      20000
    );

    const btn = await driver.findElement(
      By.xpath('//span[contains(text(), "Bekräfta val")]')
    );
    await driver.executeScript(
      "arguments[0].scrollIntoView({ behavior: 'smooth', block: 'center' });",
      btn
    );

    const visible = await btn.isDisplayed();
    console.log("Is'Bekräfta val' visible?", visible);

    if (visible) {
      await btn.click();
    } else {
      console.log("The button is not visible, use JS click");
      await driver.executeScript("arguments[0].click();", btn);
    }

    let elements = await driver.findElements(
      By.className("manager-cookie__wrapper")
    );
    if (elements.length === 0) {
      console.log("Pop up is gone");
    }

    await driver.navigate().refresh();

    await driver.wait(
      until.elementLocated(By.className("manager-cookie__wrapper")),
      20000
    );

    console.log("Test Decline cookies DEV passed");
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

describe("Sign up via email DEV", function () {
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

  it("should  sign up via email successfully", async function () {
    this.timeout(20000);
    await driver.get("https://dev.hemie.org/");

    await driver.wait(
      until.elementLocated(
        By.xpath('//span[contains(text(), "Kom igång gratis")]')
      ),
      20000
    );
    await driver
      .findElement(By.xpath('//span[contains(text(), "Kom igång gratis")]'))
      .click();

    await driver.wait(
      until.elementLocated(
        By.xpath('//h1[contains(text(), "Hur vill du bo?")]')
      ),
      5000
    );
    await driver.findElement(By.xpath('//div[contains(text(), "1")]')).click();
    await driver
      .findElement(By.xpath('//div[contains(text(), "5000")]'))
      .click();
    await driver
      .findElement(By.className("ant-select-selection-overflow"))
      .click();
    await driver.wait(
      until.elementLocated(By.xpath('//span[contains(text(), "Vaxholm")]')),
      5000
    );
    await driver
      .findElement(By.xpath('//span[contains(text(), "Vaxholm")]'))
      .click();
    await driver.findElement(By.css("body")).click();

    await driver
      .findElement(By.xpath('//span[contains(text(), "Gå vidare")]'))
      .click();

    await driver.wait(
      until.elementLocated(
        By.xpath('//h1[contains(text(), "Välkommen till Hemie!")]')
      ),
      20000
    );
    await driver.wait(
      until.elementLocated(By.xpath('//p[contains(text(), "2/5")]')),
      2000
    );

    const name = "Autotests name";
    const randomNumber = Math.floor(Math.random() * 100000);
    const email = `veronika.malahovskaya+${randomNumber}@solveit.dev`;
    const password = "Test12345!";
    await driver.findElement(By.id("signUpName")).sendKeys(name);
    await driver.findElement(By.id("signUpEmail")).sendKeys(email);
    await driver.findElement(By.id("signUpPassword")).sendKeys(password);

    await driver
      .findElement(By.xpath('//span[contains(text(), "Gå vidare")]'))
      .click();

    this.timeout(20000);
    await driver.wait(
      until.elementLocated(
        By.xpath('//h1[contains(text(), "Hur bor du idag?")]')
      ),
      20000
    );
    await driver.wait(
      until.elementLocated(By.xpath('//p[contains(text(), "3/5")]')),
      5000
    );
    await driver
      .findElement(By.xpath('//*[contains(@placeholder, "Ange din adress")]'))
      .sendKeys("wad");
    await driver.wait(
      until.elementLocated(
        By.xpath(
          '//div[contains(text(), "Wadköping, BERTIL WALDÉNS GATA, Örebro, Sverige")]'
        )
      ),
      5000
    );
    await driver
      .findElement(
        By.xpath(
          '//div[contains(text(), "Wadköping, BERTIL WALDÉNS GATA, Örebro, Sverige")]'
        )
      )
      .click();

    await driver.findElement(By.xpath('//div[contains(text(), "6")]')).click();
    await driver.findElement(By.xpath('//div[contains(text(), "BV")]')).click();
    await driver.findElement(By.id("square")).sendKeys("36");
    await driver.findElement(By.id("rent")).sendKeys("2500");

    await driver
      .findElement(By.xpath('//span[contains(text(), "Gå vidare")]'))
      .click();

    this.timeout(60000);
    await driver.wait(
      until.elementLocated(
        By.xpath('//p[contains(text(), "Fyll i detaljer om din bostad")]')
      ),
      50000
    );
    await driver.wait(
      until.elementLocated(By.xpath('//p[contains(text(), "4/5")]')),
      5000
    );
    const dropdownTrigger = await driver.findElement(
      By.className("ant-select-selection-overflow")
    );
    await driver.executeScript(
      "arguments[0].scrollIntoView({block: 'center'});",
      dropdownTrigger
    );
    await dropdownTrigger.click();

    const balkongOption = await driver.wait(
      until.elementLocated(By.xpath('//span[contains(text(), "Balkong")]')),
      10000
    );
    await driver.wait(until.elementIsVisible(balkongOption), 5000);
    await driver.executeScript(
      "arguments[0].scrollIntoView({block: 'center'});",
      balkongOption
    );
    await balkongOption.click();
    // await driver
    //   .findElement(By.className("ant-select-selection-overflow"))
    //   .click();
    // await driver
    //   .findElement(By.xpath('//span[contains(text(), "Balkong")]'))
    //   .click();

    await driver
      .findElement(By.xpath('//span[contains(text(), "Badkar")]'))
      .click();
    await driver
      .findElement(By.xpath('//span[contains(text(), "Rullstolsanpassad")]'))
      .click();
    await driver.findElement(By.css("body")).click();
    console.log("5");
    await driver
      .findElement(By.id("search-select-housing-group"))
      .sendKeys("AF Bostäder");
    await driver
      .findElement(By.className("ant-input css-1m63z2v ant-input-outlined"))
      .sendKeys(
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
      );

    await driver
      .findElement(By.xpath('//span[contains(text(), "Gå vidare")]'))
      .click();
    console.log("6");
    await driver.wait(
      until.elementLocated(
        By.xpath('//h1[contains(text(), "Lägg till bilder")]')
      ),
      20000
    );
    await driver.wait(
      until.elementLocated(By.xpath('//p[contains(text(), "5/5")]')),
      5000
    );
    console.log("7");
    await driver
      .findElement(By.xpath('//span[contains(text(), "Fixa bilder senare")]'))
      .click();
    console.log("8");
    await driver.wait(
      until.elementLocated(
        By.xpath('//h2[contains(text(), "Öka din annons synlighet")]')
      ),
      5000
    );

    await driver.wait(async () => {
      const url = await driver.getCurrentUrl();
      return url.includes("/home");
    }, 30000);

    const finalUrl = await driver.getCurrentUrl();
    console.log("Redirected to:", finalUrl);

    if (!finalUrl.includes("/home")) {
      throw new Error(`Unexpected redirect URL after login: ${finalUrl}`);
    }

    console.log("Test Sign up via email DEV passed");
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
