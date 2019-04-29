let libStatics = require("../lib/statics");
let libUtility = require("../lib/utility");
let langCommon = require('../lang/common');
let lang = require("../lang/en");

functions = {};

functions.getDate = (query) =>{
    if (libUtility.includes(query, lang.BETWEEN)) {
        let index1 = query.indexOf(langCommon.SPACE, query.indexOf(lang.BETWEEN)) + 1;
        let index2 = query.indexOf(lang.AND) - 1;
        let index3 = query.indexOf(langCommon.SPACE, query.indexOf(lang.AND)) + 1;
        let index4 = query.length;

        let first_date = functions.calculateDate(query.slice(index1, index2));
        let second_date = functions.calculateDate(query.slice(index3, index4));
        return {
            type: libStatics.DATE_TYPE_BETWEEN,
            first_date: first_date,
            second_date: second_date,
        }
    } else if (libUtility.includes(query, lang.IN)) {
        let date = functions.calculateDate(query);
        return {
            type: libStatics.DATE_TYPE_IN,
            date: date,
        };
    } else if (libUtility.includes(query, lang.SINCE)) {
        let date = functions.calculateDate(query);
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
        if (!isNaN(item) && item.length === 4) {
            // Year, Number and 4 digit
            year = parseInt(item);
            if(!month_set) month = 1;
            if(!date_set) date = 1;
        } else if (lang.MONTH.includes(item)) {
            // Month
            month_set = true;
            month = lang.MONTH.indexOf(item) + 1;
            if(!date_set) date = 1;
        } else if (lang.DATE.includes(item)) {
            // Date 1st, 2nd, 3rd
            date_set = true;
            date = parseInt(item[0])
        } else if (item.includes("th")) {
            // Date rest
            date_set = true;
            date = parseInt(item.slice(0, item.indexOf("th")));
        }
    });
    return {
        year: year,
        month: month,
        date: date,
        flags: {
            month_set:month_set,
            date_set:date_set,
        }
    }
};

module.exports = functions;