const puppeteer = require('puppeteer');
const fs = require('fs')

const {
  getCookies
} = require('./cookieHandler');

const work = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  for (cookie of await getCookies()) {
    await page.setCookie(cookie);
  }
  await page.goto('https://registrar.nu.edu.kz/my-registrar/check-grades/json?method=getGrades&_dc=1544432783793&type=final&page=1&start=0&limit=25');
  const content = await page.content();

  const grades = await page.evaluate(() => {
    return JSON.parse(document.querySelector("body").innerText);
  });
  grades.forEach(g => {
    console.log(`Course: ${g.TITLE}
    Grade: ${g.GRADE}
    `);
  })
  await browser.close();
}

(async () => {
  await work();
})();