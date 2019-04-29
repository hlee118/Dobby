// var express = require('express');
// var router = express.Router();
// var db_info = require('../lib/db');
// var mysql = require('mysql');
//
// const webdriver = require('selenium-webdriver');
// const chrome = require('selenium-webdriver/chrome');
// const chrome_options = new chrome.Options()
//     .addArguments('--headless');
// const driver = new webdriver.Builder()
//     .forBrowser('chrome')
//     .setChromeOptions(chrome_options)
//     .build();
//
// router.get('/getPage', (req, res) => {
//     let query_str = 'SELECT * FROM pages where page_name="' + page_name + '";';
//     let connection = mysql.createConnection(db_info);
//     connection.connect();
//     connection.query(query_str, (error, results, fields) => {
//         if (error)
//             throw error;
//         driver.get(results[0].page_url)
//             .then(() => driver.findElement(webdriver.By.className('naver_logo')))
//             .then((span) => span.getText())
//             .then((text) => console.log(text))
//
//         resolve(page_url);
//     });
//     connection.end();
//
//
// });
//
// router.post('/getDB', (req, res) => {
//     let connection = mysql.createConnection(db_info);
//     connection.connect();
//     connection.query('SELECT * FROM pages where id = 1', (error, results, fields) => {
//         if (error)
//             throw error;
//         res.send(results);
//     })
//     connection.end();
// });
//
// module.exports = router;
