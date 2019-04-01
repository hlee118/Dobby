/*
    Hyunsik Lee
    University of Illinois at Chicago computer science news
    http://cs.uic.edu/news/
 */

function parse(driver, By) {
    return new Promise((resolve)=>{
        const start_num = 1;
        const end_num = 3;
        let result = [];
        for (let i = start_num; i <= end_num; i++) {
            let element = driver.findElement(By.xpath('//*[@id="article"]/div[3]/section[1]/div/div[2]/div[1]/article[' + i + ']/div/h3/a'));
            element.getText().then((text) => {
                result.push(text);
                if(i === end_num)
                    resolve(result);
            });

        }
    });
}

module.exports = parse;