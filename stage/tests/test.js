import { Builder, By, until } from "selenium-webdriver";
import chrome from "selenium-webdriver/chrome.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { path as chromedriverPath } from "chromedriver";

console.log("Use chromedriver:", chromedriverPath);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe("Login Logout STAGE", function () {
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
    await driver.get("https://staging.hemie.org/");

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

    console.log("Test Login Logout STAGE passed");
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

describe("Accept cookies STAGE", function () {
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
    await driver.get("https://staging.hemie.org/");

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

    console.log("Test Accept cookies STAGE passed");
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

describe("Decline cookies STAGE", function () {
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
    await driver.get("https://staging.hemie.org/");

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

    console.log("Test Decline cookies STAGE passed");
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

describe("Sign up via email (1 room, 5000 rent, Stockholm) STAGE", function () {
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
    await driver.get("https://staging.hemie.org/");

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
      20000
    );

    const areaSelectSecond = await driver.findElement(
      By.xpath(
        '//div[contains(text(), "Wadköping, BERTIL WALDÉNS GATA, Örebro, Sverige")]'
      )
    );
    await driver.executeScript("arguments[0].click();", areaSelectSecond);

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

    await driver
      .findElement(By.xpath('//span[contains(text(), "Badkar")]'))
      .click();
    await driver
      .findElement(By.xpath('//span[contains(text(), "Rullstolsanpassad")]'))
      .click();
    await driver.findElement(By.css("body")).click();

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

    await driver
      .findElement(By.xpath('//span[contains(text(), "Fixa bilder senare")]'))
      .click();

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

    console.log(
      "Test Sign up via email STAGE (1 room, 5000 rent, Stockholm) passed"
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

describe("Forgot password STAGE", function () {
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
    await driver.get("https://staging.hemie.org/");

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
      .sendKeys("veronika.malahovskaya@solveit.dev");

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

    console.log("Test Forgot password STAGE passed");
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

describe("Terms and privacy check STAGE", function () {
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
    await driver.get("https://staging.hemie.org/");

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
      20000
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

    await driver.wait(
      until.elementLocated(
        By.xpath(
          '//p[contains(text(), "Genom att registrera dig godkänner du vår")]'
        )
      ),
      2000
    );

    await driver.wait(
      until.elementLocated(By.xpath('//a[contains(text(), "Villkor")]')),
      2000
    );

    await driver.wait(
      until.elementLocated(
        By.xpath('//a[contains(text(), "Integritetspolicy.")]')
      ),
      2000
    );

    const originalTabs = await driver.getAllWindowHandles();

    const terms = await driver.findElement(
      By.xpath('//a[contains(text(), "Villkor")]')
    );
    await terms.click();

    await driver.wait(async () => {
      const handles = await driver.getAllWindowHandles();
      return handles.length > originalTabs.length;
    }, 5000);

    const newTabs = await driver.getAllWindowHandles();
    const newTabTerms = newTabs.find((h) => !originalTabs.includes(h));

    await driver.switchTo().window(newTabTerms);

    const newUrlTerms = await driver.getCurrentUrl();
    console.log("Redirected to:", newUrlTerms);

    if (
      !newUrlTerms.includes(
        "https://support.hemie.se/hc/sv/articles/23897647360018-Allm%C3%A4nna-villkor"
      )
    ) {
      throw new Error(`Unexpected redirect URL after login: ${newUrlTerms}`);
    }

    await driver.close();
    await driver.switchTo().window(originalTabs[0]);

    const privacy = await driver.findElement(
      By.xpath('//a[contains(text(), "Villkor")]')
    );
    await privacy.click();

    await driver.wait(async () => {
      const handles = await driver.getAllWindowHandles();
      return handles.length > originalTabs.length;
    }, 5000);

    const newTabsPrivacy = await driver.getAllWindowHandles();
    const newTabPrivacy = newTabsPrivacy.find((h) => !originalTabs.includes(h));

    await driver.switchTo().window(newTabPrivacy);

    const newUrlPrivacy = await driver.getCurrentUrl();
    console.log("Redirected to:", newUrlPrivacy);

    if (
      !newUrlPrivacy.includes(
        "https://support.hemie.se/hc/sv/articles/23897647360018-Allm%C3%A4nna-villkor"
      )
    ) {
      throw new Error(`Unexpected redirect URL after login: ${newUrlPrivacy}`);
    }

    await driver.close();
    await driver.switchTo().window(originalTabs[0]);

    console.log("Test Terms and privacy check STAGE passed");
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

describe("Log in with invalid password STAGE", function () {
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
    await driver.get("https://staging.hemie.org/");

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

    console.log("Test Log in with invalid password STAGE passed");
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

describe("Log in with invalid email STAGE", function () {
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
    await driver.get("https://staging.hemie.org/");

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

    console.log("Test Log in with invalid email STAGE passed");
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

describe("Log in from Sign up form STAGE", function () {
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
    await driver.get("https://staging.hemie.org/");

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

    console.log("Test Log in from Sign up form STAGE passed");
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

describe("Log in from Utforska page STAGE", function () {
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
    await driver.get("https://staging.hemie.org/");

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

    console.log("Test Log in from Utforska page STAGE passed");
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

describe("Empty name sign up STAGE", function () {
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
    await driver.get("https://staging.hemie.org/");

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

    console.log("Empty name sign up STAGE passed");
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

describe("Invalid email sign up STAGE", function () {
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
    await driver.get("https://staging.hemie.org/");

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

    console.log("Invalid email sign up STAGE passed");
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

describe("Invalid password sign up STAGE", function () {
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
    await driver.get("https://staging.hemie.org/");

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

    console.log("Invalid password sign up STAGE passed");
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

describe("Login by clicking on Like icon STAGE", function () {
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
    await driver.get("https://staging.hemie.org/");

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

    console.log("Test Login by clicking on Like icon STAGE passed");
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

describe("Sign up via email (2 rooms, 7500 rent, Gothenburg) STAGE", function () {
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
    await driver.get("https://staging.hemie.org/");

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
    await driver.findElement(By.xpath('//div[contains(text(), "2")]')).click();
    await driver
      .findElement(By.xpath('//div[contains(text(), "7500")]'))
      .click();
    const secondList = await driver.findElement(
      By.xpath(
        "(//div[contains(@class,'ant-select-selection-overflow-item ant-select-selection-overflow-item-rest')])[2]"
      )
    );
    await secondList.click();
    await driver.wait(
      until.elementLocated(
        By.xpath(
          '//span[contains(text(), "Asperö, Brännö, Donsö, Köpstadsö, Styrsö, Vrå")]'
        )
      ),
      5000
    );
    const areaSelectFirst = await driver.findElement(
      By.xpath(
        '//span[contains(text(), "Asperö, Brännö, Donsö, Köpstadsö, Styrsö, Vrå")]'
      )
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

    const name = "Autotests name";
    const randomNumber = Math.floor(Math.random() * 100000);
    const email = `qa+${randomNumber}@solveit.dev`;
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
      20000
    );
    const areaSelectSecond = await driver.findElement(
      By.xpath(
        '//div[contains(text(), "Wadköping, BERTIL WALDÉNS GATA, Örebro, Sverige")]'
      )
    );
    await driver.executeScript("arguments[0].click();", areaSelectSecond);

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

    await driver
      .findElement(By.xpath('//span[contains(text(), "Badkar")]'))
      .click();
    await driver
      .findElement(By.xpath('//span[contains(text(), "Rullstolsanpassad")]'))
      .click();
    await driver.findElement(By.css("body")).click();

    await driver
      .findElement(By.id("search-select-housing-group"))
      .sendKeys("AF Bostäder");

    await driver
      .findElement(By.xpath('//span[contains(text(), "Gå vidare")]'))
      .click();

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

    await driver
      .findElement(By.xpath('//span[contains(text(), "Fixa bilder senare")]'))
      .click();

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

    console.log(
      "Test Sign up via email (2 rooms, 7500 rent, Gothenburg) STAGE passed"
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

describe("Sign up via email (3 rooms, 10000 rent, Malmo) STAGE", function () {
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
    await driver.get("https://staging.hemie.org/");

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
    await driver.findElement(By.xpath('//div[contains(text(), "3")]')).click();
    await driver
      .findElement(By.xpath('//div[contains(text(), "10000")]'))
      .click();
    const thirdList = await driver.findElement(
      By.xpath(
        "(//div[contains(@class,'ant-select-selection-overflow-item ant-select-selection-overflow-item-rest')])[3]"
      )
    );
    await thirdList.click();
    await driver.wait(
      until.elementLocated(By.xpath('//span[contains(text(), "Limhamn")]')),
      5000
    );
    const areaSelectFirst = await driver.findElement(
      By.xpath('//span[contains(text(), "Limhamn")]')
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

    const name = "Autotests name";
    const randomNumber = Math.floor(Math.random() * 100000);
    const email = `qa+${randomNumber}@solveit.dev`;
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
      20000
    );
    const areaSelectSecond = await driver.findElement(
      By.xpath(
        '//div[contains(text(), "Wadköping, BERTIL WALDÉNS GATA, Örebro, Sverige")]'
      )
    );
    await driver.executeScript("arguments[0].click();", areaSelectSecond);

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

    await driver
      .findElement(By.xpath('//span[contains(text(), "Badkar")]'))
      .click();
    await driver
      .findElement(By.xpath('//span[contains(text(), "Rullstolsanpassad")]'))
      .click();
    await driver.findElement(By.css("body")).click();

    await driver
      .findElement(By.id("search-select-housing-group"))
      .sendKeys("AF Bostäder");

    await driver
      .findElement(By.xpath('//span[contains(text(), "Gå vidare")]'))
      .click();

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

    await driver
      .findElement(By.xpath('//span[contains(text(), "Fixa bilder senare")]'))
      .click();

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

    console.log(
      "Test Sign up via email (3 rooms, 10000 rent, Malmo) STAGE passed"
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

describe("Sign up via email (4 rooms, 12500 rent, Stockholm 2 options) STAGE", function () {
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
    await driver.get("https://staging.hemie.org/");

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
    await driver.findElement(By.xpath('//div[contains(text(), "4")]')).click();
    await driver
      .findElement(By.xpath('//div[contains(text(), "12500")]'))
      .click();
    const thirdList = await driver.findElement(
      By.xpath(
        "(//div[contains(@class,'ant-select-selection-overflow-item ant-select-selection-overflow-item-rest')])[1]"
      )
    );
    await thirdList.click();
    await driver.wait(
      until.elementLocated(
        By.xpath('//span[contains(text(), "Upplands Väsby")]')
      ),
      5000
    );
    const areaSelectFirst = await driver.findElement(
      By.xpath('//span[contains(text(), "Upplands Väsby")]')
    );
    await driver.executeScript("arguments[0].click();", areaSelectFirst);
    await driver.findElement(By.css("body")).click();

    await thirdList.click();
    await driver.wait(
      until.elementLocated(By.xpath('//span[contains(text(), "Vallentuna")]')),
      5000
    );
    const areaSelect = await driver.findElement(
      By.xpath('//span[contains(text(), "Vallentuna")]')
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

    const name = "Autotests name";
    const randomNumber = Math.floor(Math.random() * 100000);
    const email = `qa+${randomNumber}@solveit.dev`;
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
      20000
    );
    const areaSelectSecond = await driver.findElement(
      By.xpath(
        '//div[contains(text(), "Wadköping, BERTIL WALDÉNS GATA, Örebro, Sverige")]'
      )
    );
    await driver.executeScript("arguments[0].click();", areaSelectSecond);

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

    await driver
      .findElement(By.xpath('//span[contains(text(), "Badkar")]'))
      .click();
    await driver
      .findElement(By.xpath('//span[contains(text(), "Rullstolsanpassad")]'))
      .click();
    await driver.findElement(By.css("body")).click();

    await driver
      .findElement(By.id("search-select-housing-group"))
      .sendKeys("AF Bostäder");

    await driver
      .findElement(By.xpath('//span[contains(text(), "Gå vidare")]'))
      .click();

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

    await driver
      .findElement(By.xpath('//span[contains(text(), "Fixa bilder senare")]'))
      .click();

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

    console.log(
      "Test Sign up via email (4 rooms, 12500 rent, Stockholm 2 options) STAGE passed"
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

describe("Sign up via email (5 rooms, + rent, Gothenburg 2 options) STAGE", function () {
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
    await driver.get("https://staging.hemie.org/");

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
    await driver.findElement(By.xpath('//div[contains(text(), "5")]')).click();
    await driver.findElement(By.xpath('//span[contains(text(), "+")]')).click();
    let plusAmount = await driver.wait(
      until.elementLocated(
        By.xpath(
          "(//div[contains(@class,'ant-select-item-option-content')])[1]"
        )
      ),
      7000
    );

    await driver.wait(until.elementIsVisible(plusAmount), 5000);
    await driver.wait(until.elementIsEnabled(plusAmount), 5000);
    await driver.executeScript(
      "arguments[0].scrollIntoView({block: 'center'});",
      plusAmount
    );
    await driver.executeScript("arguments[0].click();", plusAmount);
    const thirdList = await driver.findElement(
      By.xpath(
        "(//div[contains(@class,'ant-select-selection-overflow-item ant-select-selection-overflow-item-rest')])[2]"
      )
    );
    await thirdList.click();
    await driver.wait(
      until.elementLocated(By.xpath('//span[contains(text(), "Kållered")]')),
      5000
    );
    const areaSelectFirst = await driver.findElement(
      By.xpath('//span[contains(text(), "Kållered")]')
    );
    await driver.executeScript("arguments[0].click();", areaSelectFirst);
    await driver.findElement(By.css("body")).click();

    await thirdList.click();
    await driver.wait(
      until.elementLocated(
        By.xpath('//span[contains(text(), "Hisings backa")]')
      ),
      5000
    );
    const areaSelect = await driver.findElement(
      By.xpath('//span[contains(text(), "Hisings backa")]')
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

    const name = "Autotests name";
    const randomNumber = Math.floor(Math.random() * 100000);
    const email = `qa+${randomNumber}@solveit.dev`;
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
      20000
    );
    const areaSelectSecond = await driver.findElement(
      By.xpath(
        '//div[contains(text(), "Wadköping, BERTIL WALDÉNS GATA, Örebro, Sverige")]'
      )
    );
    await driver.executeScript("arguments[0].click();", areaSelectSecond);

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

    await driver
      .findElement(By.xpath('//span[contains(text(), "Badkar")]'))
      .click();
    await driver
      .findElement(By.xpath('//span[contains(text(), "Rullstolsanpassad")]'))
      .click();
    await driver.findElement(By.css("body")).click();

    await driver
      .findElement(By.id("search-select-housing-group"))
      .sendKeys("AF Bostäder");

    await driver
      .findElement(By.xpath('//span[contains(text(), "Gå vidare")]'))
      .click();

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

    await driver
      .findElement(By.xpath('//span[contains(text(), "Fixa bilder senare")]'))
      .click();

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

    console.log(
      "Test Sign up via email (5 rooms, + rent, Gothenburg 2 options) STAGE passed"
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

describe("Sign up via email (2 rooms, + rent, Malmo 2 options) STAGE", function () {
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
    await driver.get("https://staging.hemie.org/");

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
    await driver.findElement(By.xpath('//div[contains(text(), "2")]')).click();
    await driver.findElement(By.xpath('//span[contains(text(), "+")]')).click();
    let plusAmount = await driver.wait(
      until.elementLocated(
        By.xpath(
          "(//div[contains(@class,'ant-select-item-option-content')])[1]"
        )
      ),
      7000
    );

    await driver.wait(until.elementIsVisible(plusAmount), 5000);
    await driver.wait(until.elementIsEnabled(plusAmount), 5000);
    await driver.executeScript(
      "arguments[0].scrollIntoView({block: 'center'});",
      plusAmount
    );
    await driver.executeScript("arguments[0].click();", plusAmount);
    const thirdList = await driver.findElement(
      By.xpath(
        "(//div[contains(@class,'ant-select-selection-overflow-item ant-select-selection-overflow-item-rest')])[3]"
      )
    );
    await thirdList.click();
    await driver.wait(
      until.elementLocated(
        By.xpath('//span[contains(text(), "Malmö, södra/östra")]')
      ),
      5000
    );
    const areaSelectFirst = await driver.findElement(
      By.xpath('//span[contains(text(), "Malmö, södra/östra")]')
    );
    await driver.executeScript("arguments[0].click();", areaSelectFirst);
    await driver.findElement(By.css("body")).click();

    await thirdList.click();
    await driver.wait(
      until.elementLocated(
        By.xpath('//span[contains(text(), "Malmö, Östra")]')
      ),
      5000
    );
    const areaSelect = await driver.findElement(
      By.xpath('//span[contains(text(), "Malmö, Östra")]')
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

    const name = "Autotests name";
    const randomNumber = Math.floor(Math.random() * 100000);
    const email = `qa+${randomNumber}@solveit.dev`;
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
      20000
    );
    const areaSelectSecond = await driver.findElement(
      By.xpath(
        '//div[contains(text(), "Wadköping, BERTIL WALDÉNS GATA, Örebro, Sverige")]'
      )
    );
    await driver.executeScript("arguments[0].click();", areaSelectSecond);

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

    await driver
      .findElement(By.xpath('//span[contains(text(), "Badkar")]'))
      .click();
    await driver
      .findElement(By.xpath('//span[contains(text(), "Rullstolsanpassad")]'))
      .click();
    await driver.findElement(By.css("body")).click();

    await driver
      .findElement(By.id("search-select-housing-group"))
      .sendKeys("AF Bostäder");

    await driver
      .findElement(By.xpath('//span[contains(text(), "Gå vidare")]'))
      .click();

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

    await driver
      .findElement(By.xpath('//span[contains(text(), "Fixa bilder senare")]'))
      .click();

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

    console.log(
      "Test Sign up via email (2 rooms, + rent, Malmo 2 options) STAGE passed"
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

describe("No options chosen for 1st step of onboarding STAGE", function () {
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
    await driver.get("https://staging.hemie.org/");

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
      "Test No options chosen for 1st step of onboarding STAGE passed"
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

describe("Go back from 2nd step of onboarding to the 1st step of onboarding STAGE", function () {
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
    await driver.get("https://staging.hemie.org/");

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
      "Test Go back from 2nd step of onboarding to the 1st step of onboarding STAGE passed"
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

describe("No options chosen for 2nd step of onboarding STAGE", function () {
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
    await driver.get("https://staging.hemie.org/");

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

    console.log("Test No options chosen for 2nd step STAGE passed");
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

describe("Empty name for 2nd step of onboarding STAGE", function () {
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
    await driver.get("https://staging.hemie.org/");

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
      20000
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
      20000
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

describe("Empty email for 2nd step of onboarding STAGE", function () {
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
    await driver.get("https://staging.hemie.org/");

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

    console.log("Test Empty email for 2nd step STAGE passed");
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

describe("Empty password for 2nd step of onboarding STAGE", function () {
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
    await driver.get("https://staging.hemie.org/");

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

    console.log("Test Empty password for 2nd step of onboarding STAGE passed");
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

describe("Go back from 3rd step of onboarding to the 2nd of onboarding step STAGE", function () {
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
    await driver.get("https://staging.hemie.org/");

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

    const randomNumber = Math.floor(Math.random() * 100000);
    const email = `qa+${randomNumber}@solveit.dev`;
    await driver.findElement(By.id("signUpName")).sendKeys("Auto test");
    await driver.findElement(By.id("signUpEmail")).sendKeys(email);
    await driver.findElement(By.id("signUpPassword")).sendKeys("Test12345!");

    await driver
      .findElement(By.xpath('//span[contains(text(), "Gå vidare")]'))
      .click();

    await driver.wait(
      until.elementLocated(By.xpath('//p[contains(text(), "3/5")]')),
      20000
    );

    await driver.wait(
      until.elementLocated(
        By.xpath('//h1[contains(text(), "Hur bor du idag?")]')
      ),
      2000
    );

    await driver
      .findElement(By.xpath('//span[contains(text(), "Tillbaka")]'))
      .click();

    await driver.wait(
      until.elementLocated(By.xpath('//p[contains(text(), "2/5")]')),
      4000
    );

    await driver.wait(
      until.elementLocated(
        By.xpath('//h1[contains(text(), "Välkommen till Hemie!")]')
      ),
      2000
    );
    console.log(
      "Test Go back from 3rd step of onboarding to the 2nd of onboarding step STAGE passed"
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

describe("Empty address for 3rd step of onboarding STAGE", function () {
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
    await driver.get("https://staging.hemie.org/");

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

    const randomNumber = Math.floor(Math.random() * 100000);
    const email = `qa+${randomNumber}@solveit.dev`;
    await driver.findElement(By.id("signUpName")).sendKeys("Auto test");
    await driver.findElement(By.id("signUpEmail")).sendKeys(email);
    await driver.findElement(By.id("signUpPassword")).sendKeys("Test12345!");

    await driver
      .findElement(By.xpath('//span[contains(text(), "Gå vidare")]'))
      .click();

    await driver.wait(
      until.elementLocated(By.xpath('//p[contains(text(), "3/5")]')),
      20000
    );

    await driver.wait(
      until.elementLocated(
        By.xpath('//h1[contains(text(), "Hur bor du idag?")]')
      ),
      2000
    );

    await driver.findElement(By.xpath('//div[contains(text(), "6")]')).click();
    await driver.findElement(By.xpath('//div[contains(text(), "BV")]')).click();
    await driver.findElement(By.id("square")).sendKeys("36");
    await driver.findElement(By.id("rent")).sendKeys("2500");

    await driver
      .findElement(By.xpath('//span[contains(text(), "Gå vidare")]'))
      .click();

    await driver.wait(
      until.elementLocated(
        By.xpath(
          '//p[contains(text(), "Vänligen fyll i adressen till din nuvarande bostad")]'
        )
      ),
      2000
    );

    console.log("Test Empty address for 3rd step of onboarding STAGE passed");
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

describe("Empty rooms for 3rd step of onboarding STAGE", function () {
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
    await driver.get("https://staging.hemie.org/");

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

    const randomNumber = Math.floor(Math.random() * 100000);
    const email = `qa+${randomNumber}@solveit.dev`;
    await driver.findElement(By.id("signUpName")).sendKeys("Auto test");
    await driver.findElement(By.id("signUpEmail")).sendKeys(email);
    await driver.findElement(By.id("signUpPassword")).sendKeys("Test12345!");

    await driver
      .findElement(By.xpath('//span[contains(text(), "Gå vidare")]'))
      .click();

    await driver.wait(
      until.elementLocated(By.xpath('//p[contains(text(), "3/5")]')),
      20000
    );

    await driver.wait(
      until.elementLocated(
        By.xpath('//h1[contains(text(), "Hur bor du idag?")]')
      ),
      2000
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
      20000
    );
    const areaSelectSecond = await driver.findElement(
      By.xpath(
        '//div[contains(text(), "Wadköping, BERTIL WALDÉNS GATA, Örebro, Sverige")]'
      )
    );
    await driver.executeScript("arguments[0].click();", areaSelectSecond);

    await driver.findElement(By.xpath('//div[contains(text(), "BV")]')).click();
    await driver.findElement(By.id("square")).sendKeys("36");
    await driver.findElement(By.id("rent")).sendKeys("2500");

    await driver
      .findElement(By.xpath('//span[contains(text(), "Gå vidare")]'))
      .click();

    await driver.wait(
      until.elementLocated(
        By.xpath(
          '//p[contains(text(), "Ange antal rum i din nuvarande bostad")]'
        )
      ),
      2000
    );

    console.log("Test Empty rooms for 3rd step of onboarding STAGE passed");
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

describe("Empty floor for 3rd step of onboarding STAGE", function () {
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
    await driver.get("https://staging.hemie.org/");

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

    const randomNumber = Math.floor(Math.random() * 100000);
    const email = `qa+${randomNumber}@solveit.dev`;
    await driver.findElement(By.id("signUpName")).sendKeys("Auto test");
    await driver.findElement(By.id("signUpEmail")).sendKeys(email);
    await driver.findElement(By.id("signUpPassword")).sendKeys("Test12345!");

    await driver
      .findElement(By.xpath('//span[contains(text(), "Gå vidare")]'))
      .click();

    await driver.wait(
      until.elementLocated(By.xpath('//p[contains(text(), "3/5")]')),
      20000
    );

    await driver.wait(
      until.elementLocated(
        By.xpath('//h1[contains(text(), "Hur bor du idag?")]')
      ),
      2000
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
      20000
    );
    const areaSelectSecond = await driver.findElement(
      By.xpath(
        '//div[contains(text(), "Wadköping, BERTIL WALDÉNS GATA, Örebro, Sverige")]'
      )
    );
    await driver.executeScript("arguments[0].click();", areaSelectSecond);

    await driver.findElement(By.xpath('//div[contains(text(), "6")]')).click();
    await driver.findElement(By.id("square")).sendKeys("36");
    await driver.findElement(By.id("rent")).sendKeys("2500");

    await driver
      .findElement(By.xpath('//span[contains(text(), "Gå vidare")]'))
      .click();

    await driver.wait(
      until.elementLocated(
        By.xpath('//p[contains(text(), "Vänligen välj din våning")]')
      ),
      2000
    );

    console.log("Test Empty floor for 3rd step of onboarding STAGE passed");
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

describe("Empty living area for 3rd step of onboarding STAGE", function () {
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
    await driver.get("https://staging.hemie.org/");

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

    const randomNumber = Math.floor(Math.random() * 100000);
    const email = `qa+${randomNumber}@solveit.dev`;
    await driver.findElement(By.id("signUpName")).sendKeys("Auto test");
    await driver.findElement(By.id("signUpEmail")).sendKeys(email);
    await driver.findElement(By.id("signUpPassword")).sendKeys("Test12345!");

    await driver
      .findElement(By.xpath('//span[contains(text(), "Gå vidare")]'))
      .click();

    await driver.wait(
      until.elementLocated(By.xpath('//p[contains(text(), "3/5")]')),
      20000
    );

    await driver.wait(
      until.elementLocated(
        By.xpath('//h1[contains(text(), "Hur bor du idag?")]')
      ),
      2000
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
      20000
    );
    const areaSelectSecond = await driver.findElement(
      By.xpath(
        '//div[contains(text(), "Wadköping, BERTIL WALDÉNS GATA, Örebro, Sverige")]'
      )
    );
    await driver.executeScript("arguments[0].click();", areaSelectSecond);

    await driver.findElement(By.xpath('//div[contains(text(), "6")]')).click();
    await driver.findElement(By.xpath('//div[contains(text(), "BV")]')).click();
    await driver.findElement(By.id("rent")).sendKeys("2500");

    await driver
      .findElement(By.xpath('//span[contains(text(), "Gå vidare")]'))
      .click();

    await driver.wait(
      until.elementLocated(
        By.xpath('//p[contains(text(), "Vänligen fyll i bostadens boyta")]')
      ),
      2000
    );

    console.log(
      "Test Empty living area for 3rd step of onboarding STAGE passed"
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

describe("Empty monthly rent for 3rd step of onboarding STAGE", function () {
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
    await driver.get("https://staging.hemie.org/");

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

    const randomNumber = Math.floor(Math.random() * 100000);
    const email = `qa+${randomNumber}@solveit.dev`;
    await driver.findElement(By.id("signUpName")).sendKeys("Auto test");
    await driver.findElement(By.id("signUpEmail")).sendKeys(email);
    await driver.findElement(By.id("signUpPassword")).sendKeys("Test12345!");

    await driver
      .findElement(By.xpath('//span[contains(text(), "Gå vidare")]'))
      .click();

    await driver.wait(
      until.elementLocated(By.xpath('//p[contains(text(), "3/5")]')),
      20000
    );

    await driver.wait(
      until.elementLocated(
        By.xpath('//h1[contains(text(), "Hur bor du idag?")]')
      ),
      2000
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
      20000
    );
    const areaSelectSecond = await driver.findElement(
      By.xpath(
        '//div[contains(text(), "Wadköping, BERTIL WALDÉNS GATA, Örebro, Sverige")]'
      )
    );
    await driver.executeScript("arguments[0].click();", areaSelectSecond);

    await driver.findElement(By.xpath('//div[contains(text(), "6")]')).click();
    await driver.findElement(By.xpath('//div[contains(text(), "BV")]')).click();
    await driver.findElement(By.id("square")).sendKeys("36");

    await driver
      .findElement(By.xpath('//span[contains(text(), "Gå vidare")]'))
      .click();

    await driver.wait(
      until.elementLocated(
        By.xpath(
          '//p[contains(text(), "Vänligen fyll i din nuvarande månadshyra")]'
        )
      ),
      2000
    );

    console.log(
      "Test Empty monthly rent for 3rd step of onboarding STAGE passed"
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

describe("Empty monthly rent 2499 for 3rd step of onboarding STAGE", function () {
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
    await driver.get("https://staging.hemie.org/");

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

    const randomNumber = Math.floor(Math.random() * 100000);
    const email = `qa+${randomNumber}@solveit.dev`;
    await driver.findElement(By.id("signUpName")).sendKeys("Auto test");
    await driver.findElement(By.id("signUpEmail")).sendKeys(email);
    await driver.findElement(By.id("signUpPassword")).sendKeys("Test12345!");

    await driver
      .findElement(By.xpath('//span[contains(text(), "Gå vidare")]'))
      .click();

    await driver.wait(
      until.elementLocated(By.xpath('//p[contains(text(), "3/5")]')),
      20000
    );

    await driver.wait(
      until.elementLocated(
        By.xpath('//h1[contains(text(), "Hur bor du idag?")]')
      ),
      2000
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
      20000
    );
    const areaSelectSecond = await driver.findElement(
      By.xpath(
        '//div[contains(text(), "Wadköping, BERTIL WALDÉNS GATA, Örebro, Sverige")]'
      )
    );
    await driver.executeScript("arguments[0].click();", areaSelectSecond);

    await driver.findElement(By.xpath('//div[contains(text(), "6")]')).click();
    await driver.findElement(By.xpath('//div[contains(text(), "BV")]')).click();
    await driver.findElement(By.id("square")).sendKeys("36");
    await driver.findElement(By.id("rent")).sendKeys("2499");

    await driver
      .findElement(By.xpath('//span[contains(text(), "Gå vidare")]'))
      .click();

    await driver.wait(
      until.elementLocated(
        By.xpath(
          '//p[contains(text(), "Fyll i din månadshyra, beloppet får inte överstiga 50 000 kr.")]'
        )
      ),
      2000
    );

    console.log(
      "Test Empty monthly rent 2499 for 3rd step of onboarding STAGE passed"
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
