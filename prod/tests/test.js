import { Builder, By, until } from "selenium-webdriver";
import chrome from "selenium-webdriver/chrome.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { path as chromedriverPath } from "chromedriver";

console.log("Use chromedriver:", chromedriverPath);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe("Login Logout PROD", function () {
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

    await driver.findElement(By.className("default_avatar_icon")).click();

    await driver.wait(
      until.elementLocated(By.xpath('//span[contains(text(), "Logga ut")]')),
      20000
    );

    await driver
      .findElement(By.xpath('//span[contains(text(), "Logga ut")]'))
      .click();

    console.log("Test Login Logout PROD passed");
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

describe("Accept cookies PROD", function () {
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
    await driver.get("https://hemie.se/");

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

    console.log("Test Accept cookies PROD passed");
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

describe("Decline cookies PROD", function () {
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
    await driver.get("https://hemie.se/");

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

    console.log("Test Decline cookies PROD passed");
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

describe("Forgot password PROD", function () {
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

  it("should show forgot password pop up", async function () {
    this.timeout(20000);
    await driver.get("https://hemie.se/");

    await driver.wait(
      until.elementLocated(
        By.xpath('//*[contains(@class, "header-btn primary")]')
      ),
      20000
    );
    await driver
      .findElement(By.xpath('//span[contains(text(), "Logga in")]'))
      .click();

    await driver.wait(
      until.elementLocated(
        By.xpath('//button[contains(text(), "Glömt lösenord?")]')
      ),
      10000
    );

    const forgotPasswordBtn = await driver.findElement(
      By.xpath('//button[contains(text(), "Glömt lösenord?")]')
    );
    await driver.executeScript("arguments[0].click();", forgotPasswordBtn);

    await driver.wait(
      until.elementLocated(
        By.xpath('//h2[contains(text(), "Återställ lösenord")]')
      ),
      5000
    );

    await driver
      .findElement(By.id("email"))
      .sendKeys("anastasia.tereshko+32@solveit.dev");

    await driver
      .findElement(By.xpath('//span[contains(text(), "Återställ lösenord")]'))
      .click();

    await driver.wait(
      until.elementLocated(
        By.xpath('//h2[contains(text(), "Återställ lösenord!")]')
      ),
      5000
    );

    await driver.wait(
      until.elementLocated(
        By.xpath(
          '//p[contains(text(), "Ett e-postmeddelande har skickats till den angivna e-postadressen. Det kan ta några minuter innan meddelandet når fram.")]'
        )
      ),
      2000
    );

    await driver.wait(
      until.elementLocated(
        By.xpath('//span[contains(text(), "Tillbaka till login")]')
      ),
      2000
    );

    console.log("Test Forgot password PROD passed");
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

describe("Log in with invalid password PROD", function () {
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

  it("should show an error", async function () {
    this.timeout(20000);
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
    const userPassword = "Test123456";
    await driver.findElement(By.css('input[name="email"]')).sendKeys(userEmail);
    await driver
      .findElement(By.css('input[name="password"]'))
      .sendKeys(userPassword);
    await driver.findElement(By.css('button[type="submit"]')).click();

    await driver.wait(
      until.elementLocated(
        By.xpath(
          '//p[contains(text(), "E-postadressen eller lösenordet är felaktigt. Var god försök igen.")]'
        )
      ),
      20000
    );

    console.log("Test Log in with invalid password PROD passed");
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

describe("Log in with invalid email PROD", function () {
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

  it("should show an error", async function () {
    this.timeout(20000);
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
    const userEmail = "test";
    const userPassword = "Test123456";
    await driver.findElement(By.css('input[name="email"]')).sendKeys(userEmail);
    await driver
      .findElement(By.css('input[name="password"]'))
      .sendKeys(userPassword);
    await driver.findElement(By.css('button[type="submit"]')).click();

    await driver.wait(
      until.elementLocated(
        By.xpath('//p[contains(text(), "Ange en giltig e-postadress.")]')
      ),
      20000
    );

    console.log("Test Log in with invalid email PROD passed");
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

describe("Log in from Sign up form PROD", function () {
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

  it("should log in successfully from sign up form", async function () {
    this.timeout(20000);
    await driver.get("https://hemie.se/");

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
      20000
    );
    const areaSelect = await driver.findElement(
      By.xpath('//span[contains(text(), "Vaxholm")]')
    );
    await driver.executeScript("arguments[0].click();", areaSelect);
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

    await driver.wait(
      until.elementLocated(
        By.xpath('//p[contains(text(), "Har du redan ett konto hos oss?")]')
      ),
      2000
    );

    await driver
      .findElement(By.xpath('//a[contains(text(), "Logga in")]'))
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

    await driver.findElement(By.className("default_avatar_icon")).click();

    await driver.wait(
      until.elementLocated(By.xpath('//span[contains(text(), "Logga ut")]')),
      20000
    );

    await driver
      .findElement(By.xpath('//span[contains(text(), "Logga ut")]'))
      .click();

    console.log("Test Log in from Sign up form PROD passed");
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

describe("Log in from Utforska page PROD", function () {
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

  it("should log in successfully from Utforska page", async function () {
    this.timeout(20000);
    await driver.get("https://hemie.se/");

    await driver.wait(
      until.elementLocated(
        By.xpath('//span[contains(text(), "Kom igång gratis")]')
      ),
      20000
    );

    await driver.wait(
      until.elementLocated(
        By.css('input[placeholder="Sök på stad eller område"]')
      ),
      10000
    );

    await driver
      .findElement(By.css('input[placeholder="Sök på stad eller område"]'))
      .sendKeys("red");

    await driver.wait(
      until.elementLocated(By.className("dropdown-container")),
      10000
    );
    this.timeout(10000);

    await driver.findElement(By.className("dropdown-container")).click();

    await driver.wait(
      until.elementLocated(By.xpath('//h1[contains(text(), "Alla annonser")]')),
      20000
    );

    await driver
      .findElement(By.xpath('//span[contains(text(), "Logga in")]'))
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

    await driver.findElement(By.className("default_avatar_icon")).click();

    await driver.wait(
      until.elementLocated(By.xpath('//span[contains(text(), "Logga ut")]')),
      20000
    );

    await driver
      .findElement(By.xpath('//span[contains(text(), "Logga ut")]'))
      .click();

    console.log("Test Log in from Utforska page PROD passed");
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

describe("Empty name sign up PROD", function () {
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

  it("should show an error", async function () {
    this.timeout(20000);
    await driver.get("https://hemie.se/");

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
    const firstList = await driver.findElement(
      By.xpath(
        "(//div[contains(@class,'ant-select-selection-overflow-item ant-select-selection-overflow-item-rest')])[1]"
      )
    );
    await firstList.click();
    await driver.wait(
      until.elementLocated(By.xpath('//span[contains(text(), "Vaxholm")]')),
      5000
    );

    const vaxholmOption = await driver.findElement(
      By.xpath('//span[contains(text(), "Vaxholm")]')
    );

    await driver.wait(until.elementIsVisible(vaxholmOption), 5000);

    await vaxholmOption.click();
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

    const randomNumber = Math.floor(Math.random() * 100000);
    const email = `qa+${randomNumber}@solveit.dev`;
    const password = "Test12345!";
    await driver.findElement(By.id("signUpEmail")).sendKeys(email);
    await driver.findElement(By.id("signUpPassword")).sendKeys(password);

    await driver
      .findElement(By.xpath('//span[contains(text(), "Gå vidare")]'))
      .click();

    await driver.wait(
      until.elementLocated(
        By.xpath('//p[contains(text(), "Detta fält är obligatoriskt")]')
      ),
      2000
    );

    console.log("Empty name sign up PROD passed");
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

describe("Invalid email sign up PROD", function () {
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

  it("should show an error", async function () {
    this.timeout(20000);
    await driver.get("https://hemie.se/");

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
    const firstList = await driver.findElement(
      By.xpath(
        "(//div[contains(@class,'ant-select-selection-overflow-item ant-select-selection-overflow-item-rest')])[1]"
      )
    );
    await firstList.click();
    await driver.wait(
      until.elementLocated(By.xpath('//span[contains(text(), "Vaxholm")]')),
      5000
    );

    const vaxholmOption = await driver.findElement(
      By.xpath('//span[contains(text(), "Vaxholm")]')
    );

    await driver.wait(until.elementIsVisible(vaxholmOption), 5000);

    await vaxholmOption.click();
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
    const email = `qa+${randomNumber}@`;
    const password = "Test12345!";
    await driver.findElement(By.id("signUpName")).sendKeys(name);
    await driver.findElement(By.id("signUpEmail")).sendKeys(email);
    await driver.findElement(By.id("signUpPassword")).sendKeys(password);

    await driver
      .findElement(By.xpath('//span[contains(text(), "Gå vidare")]'))
      .click();

    await driver.wait(
      until.elementLocated(
        By.xpath('//p[contains(text(), "Ange en giltig e-postadress.")]')
      ),
      2000
    );

    console.log("Invalid email sign up PROD passed");
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

describe("Invalid password sign up PROD", function () {
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

  it("should show an error", async function () {
    this.timeout(20000);
    await driver.get("https://hemie.se/");

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
    const email = `qa+${randomNumber}@solveit.dev`;
    await driver.findElement(By.id("signUpName")).sendKeys(name);
    await driver.findElement(By.id("signUpEmail")).sendKeys(email);
    await driver.findElement(By.id("signUpPassword")).sendKeys("");

    await driver
      .findElement(By.xpath('//span[contains(text(), "Gå vidare")]'))
      .click();

    await driver.wait(
      until.elementLocated(
        By.xpath('//p[contains(text(), "E-post är obligatoriskt")]')
      ),
      2000
    );

    await driver.findElement(By.id("signUpPassword")).sendKeys("Test");

    await driver
      .findElement(By.xpath('//span[contains(text(), "Gå vidare")]'))
      .click();

    await driver.wait(
      until.elementLocated(
        By.xpath('//p[contains(text(), "Lösenord kräver minst 8 tecken")]')
      ),
      2000
    );

    console.log("Invalid password sign up PROD passed");
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

describe("Login by clicking on Like icon PROD", function () {
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
    await driver.get("https://hemie.se/");

    await driver.wait(
      until.elementLocated(
        By.xpath('//span[contains(text(), "Kom igång gratis")]')
      ),
      20000
    );

    await driver.executeScript("window.scrollBy(0, window.innerHeight);");
    await driver.sleep(1000);

    const titleEl = await driver.wait(
      until.elementLocated(By.xpath('//h2[contains(text(), "Lägenheter")]')),
      10000
    );
    await driver.wait(until.elementIsVisible(titleEl), 5000);

    await driver.executeScript(
      "arguments[0].scrollIntoView({ behavior: 'smooth', block: 'center' });",
      titleEl
    );

    await driver.findElement(By.className("like-container ")).click();

    await driver.wait(
      until.elementLocated(
        By.xpath('//p[contains(text(), "Nyfiken på den här lägenheten?")]')
      ),
      4000
    );
    await driver.findElement(By.css("button.log-in-btn")).click();

    await driver.wait(
      until.elementLocated(
        By.xpath('//h2[contains(text(), "Välkommen till Hemie!")]')
      ),
      5000
    );

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

    await driver.findElement(By.className("default_avatar_icon")).click();

    await driver.wait(
      until.elementLocated(By.xpath('//span[contains(text(), "Logga ut")]')),
      20000
    );

    await driver
      .findElement(By.xpath('//span[contains(text(), "Logga ut")]'))
      .click();

    console.log("Test Login by clicking on Like icon PROD passed");
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

describe("No options chosen for 1st step of onboarding PROD", function () {
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

  it("should  show an error", async function () {
    this.timeout(20000);
    await driver.get("https://hemie.se/");

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
    await driver
      .findElement(By.xpath('//span[contains(text(), "Gå vidare")]'))
      .click();

    await driver.wait(
      until.elementLocated(
        By.xpath('//p[contains(text(), "Detta fält är obligatoriskt")]')
      ),
      20000
    );

    console.log(
      "Test No options chosen for 1st step of onboarding PROD passed"
    );
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

describe("Go back from 2nd step of onboarding to the 1st step of onboarding PROD", function () {
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

  it("should land to the previous step", async function () {
    this.timeout(20000);
    await driver.get("https://hemie.se/");

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
    const firstList = await driver.findElement(
      By.xpath(
        "(//div[contains(@class,'ant-select-selection-overflow-item ant-select-selection-overflow-item-rest')])[1]"
      )
    );
    await firstList.click();
    await driver.wait(
      until.elementLocated(By.xpath('//span[contains(text(), "Vaxholm")]')),
      5000
    );
    const areaSelectFirst = await driver.findElement(
      By.xpath('//span[contains(text(), "Vaxholm")]')
    );
    await driver.executeScript("arguments[0].click();", areaSelectFirst);
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

    await driver
      .findElement(By.xpath('//span[contains(text(), "Tillbaka")]'))
      .click();

    await driver.wait(
      until.elementLocated(
        By.xpath('//h1[contains(text(), "Hur vill du bo?")]')
      ),
      5000
    );

    await driver.wait(
      until.elementLocated(By.xpath('//p[contains(text(), "1/5")]')),
      2000
    );

    console.log(
      "Test Go back from 2nd step of onboarding to the 1st step of onboarding PROD passed"
    );
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

describe("No options chosen for 2nd step of onboarding PROD", function () {
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

  it("should show an error", async function () {
    this.timeout(20000);
    await driver.get("https://hemie.se/");

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
    const firstList = await driver.findElement(
      By.xpath(
        "(//div[contains(@class,'ant-select-selection-overflow-item ant-select-selection-overflow-item-rest')])[1]"
      )
    );
    await firstList.click();
    await driver.wait(
      until.elementLocated(By.xpath('//span[contains(text(), "Vaxholm")]')),
      5000
    );
    const areaSelectFirst = await driver.findElement(
      By.xpath('//span[contains(text(), "Vaxholm")]')
    );
    await driver.executeScript("arguments[0].click();", areaSelectFirst);
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

    await driver
      .findElement(By.xpath('//span[contains(text(), "Gå vidare")]'))
      .click();

    await driver.wait(
      until.elementLocated(
        By.xpath('//p[contains(text(), "Detta fält är obligatoriskt")]')
      ),
      2000
    );

    await driver.wait(
      until.elementLocated(
        By.xpath('//p[contains(text(), "E-post är obligatoriskt")]')
      ),
      2000
    );

    console.log("Test No options chosen for 2nd step PROD passed");
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

describe("Empty name for 2nd step of onboarding PROD", function () {
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

  it("should show an error", async function () {
    this.timeout(20000);
    await driver.get("https://hemie.se/");

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
    const firstList = await driver.findElement(
      By.xpath(
        "(//div[contains(@class,'ant-select-selection-overflow-item ant-select-selection-overflow-item-rest')])[1]"
      )
    );
    await firstList.click();
    await driver.wait(
      until.elementLocated(By.xpath('//span[contains(text(), "Vaxholm")]')),
      5000
    );
    const areaSelectFirst = await driver.findElement(
      By.xpath('//span[contains(text(), "Vaxholm")]')
    );
    await driver.executeScript("arguments[0].click();", areaSelectFirst);
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

    await driver.findElement(By.id("signUpEmail")).sendKeys("test@test.test");
    await driver.findElement(By.id("signUpPassword")).sendKeys("Test12345!");

    await driver
      .findElement(By.xpath('//span[contains(text(), "Gå vidare")]'))
      .click();

    await driver.wait(
      until.elementLocated(
        By.xpath('//p[contains(text(), "Detta fält är obligatoriskt")]')
      ),
      2000
    );

    console.log("Test Empty name for 2nd step STAGE passed");
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

describe("Empty email for 2nd step of onboarding PROD", function () {
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

  it("should show an error", async function () {
    this.timeout(20000);
    await driver.get("https://hemie.se/");

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
    const firstList = await driver.findElement(
      By.xpath(
        "(//div[contains(@class,'ant-select-selection-overflow-item ant-select-selection-overflow-item-rest')])[1]"
      )
    );
    await firstList.click();
    await driver.wait(
      until.elementLocated(By.xpath('//span[contains(text(), "Vaxholm")]')),
      5000
    );
    const areaSelectFirst = await driver.findElement(
      By.xpath('//span[contains(text(), "Vaxholm")]')
    );
    await driver.executeScript("arguments[0].click();", areaSelectFirst);
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

    await driver.findElement(By.id("signUpName")).sendKeys("Auto test");
    await driver.findElement(By.id("signUpPassword")).sendKeys("Test12345!");

    await driver
      .findElement(By.xpath('//span[contains(text(), "Gå vidare")]'))
      .click();

    await driver.wait(
      until.elementLocated(
        By.xpath('//p[contains(text(), "E-post är obligatoriskt")]')
      ),
      2000
    );

    console.log("Test Empty email for 2nd step PROD passed");
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

describe("Empty password for 2nd step of onboarding PROD", function () {
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

  it("should show an error", async function () {
    this.timeout(20000);
    await driver.get("https://hemie.se/");

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
    const firstList = await driver.findElement(
      By.xpath(
        "(//div[contains(@class,'ant-select-selection-overflow-item ant-select-selection-overflow-item-rest')])[1]"
      )
    );
    await firstList.click();
    await driver.wait(
      until.elementLocated(By.xpath('//span[contains(text(), "Vaxholm")]')),
      5000
    );
    const areaSelectFirst = await driver.findElement(
      By.xpath('//span[contains(text(), "Vaxholm")]')
    );
    await driver.executeScript("arguments[0].click();", areaSelectFirst);
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

    await driver.findElement(By.id("signUpEmail")).sendKeys("test@test.test");
    await driver.findElement(By.id("signUpName")).sendKeys("Auto test");

    await driver
      .findElement(By.xpath('//span[contains(text(), "Gå vidare")]'))
      .click();

    await driver.wait(
      until.elementLocated(
        By.xpath('//p[contains(text(), "Detta fält är obligatoriskt")]')
      ),
      2000
    );

    console.log("Test Empty password for 2nd step of onboarding PROD passed");
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
