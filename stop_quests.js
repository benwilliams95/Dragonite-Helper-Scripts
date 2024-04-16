const puppeteer = require('puppeteer');

//////// SET THESE //////
const BASE_URL = 'https://dragoonite.myurl.com'; // Dragonite URL goes here
const USERNAME = 'admin'; // Dragonite username goes here
const PASSWORD = 'password'; // Dragonite password goes here
const DISCORD_WEBHOOK = 'https://discord.com/api/webhooks/my-webhook/'; // Discord webhook goes here
////////////////////////

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
  const response = await page.goto(BASE_URL + '/api/quest/all/stop');
  const jsonResponse = await response.json();

  const message = {
    username: (jsonResponse.message == 'Quests stopped') ? 'Dragonite Quests: Stopped 🛑' : 'Dragonite Quests: Error ❗',
    avatar_url: 'https://www.serebii.net/dungeonrescueteamdx/pokemon/149.png',
    content: jsonResponse.message,
  };
  console.log('Current URL:', page.url());
  console.log('JSON: ', jsonResponse);
  fetch(DISCORD_WEBHOOK, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(message)
  })
    .then(response => {
      console.log('Message sent successfully!');
    })
    .catch(error => {
      console.error('Error sending message:', error);
    });
  await browser.close();
})();