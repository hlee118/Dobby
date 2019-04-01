const webdriver = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const chrome_options = new chrome.Options()
    .addArguments('--headless')
    .addArguments('--no-sandbox');
const driver = new webdriver.Builder()
    .forBrowser('chrome')
    .setChromeOptions(chrome_options)
    .build();

class parser {
    constructor(page, c_lang) {
        driver.get(page.page_url);
        this.parser_num = page.id;
        this.c_lang = c_lang;
    }

    getText() {
        return new Promise((resolve) => {
            let analyser = require("./" + this.parser_num);
            analyser(driver, webdriver.By).then((data) => {
                let text = "";
                for (let i = 0; i < data.length; i++) {
                    text += this.c_lang.COUNT_NUM[i] + ", ";
                    text += data[i];
                    text += ". ";
                }
                resolve(text);
            });
        });
    }
}

module.exports = parser;