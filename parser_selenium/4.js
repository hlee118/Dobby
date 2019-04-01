/*
    Hyunsik Lee
    한국과학기술대학교 컴퓨터공학과 공지사항
    https://cse.koreatech.ac.kr/notice
 */

function parse(driver, By) {
    return new Promise((resolve) => {
        const start_num = 1;
        const end_num = 3;
        let result = [];
        for (let i = start_num; i <= end_num; i++) {
            let element = driver.findElement(By.xpath('//*[@id="board_list"]/table/tbody/tr[' + i + ']/td[2]/a'));
            element.getText().then((text) => {
                result.push(text);
                if (i === end_num)
                    resolve(result);
            });

        }
    });
}

module.exports = parse;