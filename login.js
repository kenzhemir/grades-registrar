const puppeteer = require('puppeteer');
const fs = require('fs')
const {
  saveCookies
} = require("./cookieHandler");


const login = async () => {
    const creds = JSON.parse(fs.readFileSync('credentials.json'));
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://registrar.nu.edu.kz/user/login');
    await page.type('input[name=name]', creds.name);
    await page.type('input[name=pass]', creds.pass);
    await (await page.$('input[type=submit]')).click();
    await page.waitForNavigation();
    await saveCookies(await page.cookies())
    await page.screenshot({
      path: 'example.png'
    })
    await browser.close();
  }
  (async () => {
    await login();
  })();