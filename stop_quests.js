const puppeteer = require('puppeteer');

const BASE_URL = 'https://myurl.com'; // Dragonite URL goes here
const USERNAME = 'admin'; // Dragonite username goes here
const PASSWORD = 'password'; // Dragonite password goes here

(async () => {
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  await page.goto(BASE_URL + '/#/login');
  await page.waitForNavigation();
  console.log('Current URL:', page.url());
  if (page.url().includes('login')) {
    await page.type('#username', USERNAME);
    await page.type('#password', PASSWORD);
    await page.click('button[type="submit"]');
    await page.waitForNavigation();
  } else {
    console.log('Could not get to login page.');
  }
  console.log('Current URL:', page.url());
  await page.goto(BASE_URL + '/#/areas');
  console.log('Current URL:', page.url());
  await page.waitForSelector('li#stop-quests'); 
  await page.click('li#stop-quests');

  await browser.close();
})();