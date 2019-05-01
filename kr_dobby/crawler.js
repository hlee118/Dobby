// const webdriver = require('selenium-webdriver');
// const os = require('os');
// let chrome = null;
// // if(os.) = require('selenium-webdriver/chrome');
// if(os.type() == "Windows_NT"){
//     console.log("Loading Chromedriver");
//     chrome = require('../driver/chromedriver_windows');
// } else if(os.type() == "Linux"){
//     console.log("Loading Chromedriver");
//     chrome = require('../driver/chromedriver_linux');
// } else {
//     console.log("chrome driver error!");
//     return;
// }

const webdriver = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const chrome_options = new chrome.Options()
    .addArguments('--headless')
    .addArguments('--no-sandbox');
const driver = new webdriver.Builder()
    .forBrowser('chrome')
    .setChromeOptions(chrome_options)
    .build();

driver.get(page.page_url);
