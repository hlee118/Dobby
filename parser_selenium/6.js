/*
    Hyunsik Lee
    iit armour college of engineering news
    https://engineering.iit.edu/news
 */

function parse(driver, By) {
    return new Promise((resolve)=>{
        const start_num = 1;
        const end_num = 3;
        let result = [];
        for (let i = start_num; i <= end_num; i++) {
            let element = driver.findElement(By.xpath('//*[@id="block-views-news-block-5"]/div/div[1]/div['+i+']/div[2]/span/div[1]/a'));
            element.getText().then((text) => {
                result.push(text);
                if(i === end_num)
                    resolve(result);
            });

        }
    });
}

module.exports = parse;