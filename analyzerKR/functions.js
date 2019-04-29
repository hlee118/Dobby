let libStatics = require("../lib/statics");
let libUtility = require("../lib/utility");
let langCommon = require('../lang/common');
let lang = require("../lang/kr");

functions = {};

functions.getDate = (query) => {
    console.log(query);
    if (query.includes(lang.FROM) && query.includes(lang.TO)) {
        // ~ 부터 ~ 까지
        let index1 = query.indexOf(lang.FROM);
        let index2 = query.indexOf(lang.TO);

        let first_date = functions.calculateDate(query.slice(0, index1));
        let second_date = functions.calculateDate(query.slice(index1, index2));
        return {
            type: libStatics.DATE_TYPE_BETWEEN,
            first_date: first_date,
            second_date: second_date,
        }
    } else if (query.includes(lang.FROM)) {
        // ~ 부터
        let index1 = query.indexOf(lang.FROM);
        let date = functions.calculateDate(query.slice(0, index1));
        return {
            type: libStatics.DATE_TYPE_SINCE,
            date: date,
        };
    } else {
        return {
            type: null,
            date: null,
        }
    }
};

functions.calculateDate = (query) => {
    let words = query.split(langCommon.SPACE);
    let d = new Date();
    let year = d.getFullYear(), month = d.getMonth(), date = d.getDate();
    let month_set = false, date_set = false;
    words.forEach((item) => {
        if (item[item.length - 1] === "년" && !isNaN(item.slice(0, item.length - 1))) {
            // Year, Number and 4 digit
            year = parseInt(item.slice(0, item.length - 1));
            if (!month_set) month = 1;
            if (!date_set) date = 1;
        } else if (item[item.length - 1] === "월" && !isNaN(item.slice(0, item.length - 1))) {
            // Month
            month_set = true;
            month = parseInt(item.slice(0, item.length - 1));
            if (!date_set) date = 1;
        } else if (item[item.length - 1] === "일" && !isNaN(item.slice(0, item.length - 1))) {
            // Date
            date_set = true;
            date = parseInt(item.slice(0, item.length - 1));
        }
    });
    return {
        year: year,
        month: month,
        date: date,
    }
};

module.exports = functions;