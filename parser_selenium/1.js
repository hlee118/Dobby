/*
    Hyunsik Lee
    홍익대학교 학생공지사항
    http://www.hongik.ac.kr/front/boardlist.do?bbsConfigFK=2&siteGubun=1&menuGubun=1
 */

function parse(driver, By) {
    return new Promise((resolve) => {
        const start_num = 1;
        const end_num = 3;
        let result = [];
        for (let i = start_num; i <= end_num; i++) {
            let element = driver.findElement(By.xpath('/html/body/div/div/div[3]/div/table/tbody/tr['+i+']/td[2]/div/a/span'));
            element.getText().then((text) => {
                result.push(text);
                if (i === end_num)
                    resolve(result);
            });

        }
    });
}

module.exports = parse;