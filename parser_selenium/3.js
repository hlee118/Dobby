/*
    Hyunsik Lee
    한국과학기술대학교 전기전자통신공학부 공지사항
    https://cms3.koreatech.ac.kr/ite/590/subview.do
 */

function parse(driver, By) {
    return new Promise((resolve) => {
        const start_num = 1;
        const end_num = 3;
        let result = [];
        for (let i = start_num; i <= end_num; i++) {
            let element = driver.findElement(By.xpath('//*[@id="menu590_obj8"]/div[2]/form[2]/table/tbody/tr[' + i + ']/td[2]/a/strong'));
            element.getText().then((text) => {
                result.push(text);
                if (i === end_num)
                    resolve(result);
            });

        }
    });
}

module.exports = parse;