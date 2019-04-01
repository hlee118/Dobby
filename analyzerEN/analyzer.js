// modules
let mysql = require('mysql');
let db_info = require('../lib/db');
let functions = require('./functions');
let libStatics = require("../lib/statics");
let langCommon = require('../lang/common');
let lang = require("../lang/en");

class analyzer {
    constructor(query, storage, resolve) {
        this.connection = mysql.createConnection(db_info);
        this.query = query;
        this.words = query.split(langCommon.SPACE);
        this.storage = storage;
        this.resolve = resolve;
    }

    execute() {
        if (lang.YES.includes(this.query)) {
            // Yes
            this.yes();

        } else if (lang.NO.includes(this.query)) {
            // No
            this.no();

        } else if (this.query.includes("books")) {
            // Asked to find information
            this.ask();

        } else {
            // Fallback
            this.fallback();

        }
    };

    fallback() {
        let object = {type: libStatics.TYPE_FALLBACK,};
        this.resolve(object);
    }

    yes() {
        let object = {type: libStatics.TYPE_YES,};
        this.resolve(object);
    }

    no() {
        let object = {type: libStatics.TYPE_NO,};
        this.resolve(object);
    }

    ask() {
        this.connection.connect();
        let date_object = functions.getDate(this.query);

        let SQLQuery = "SELECT * FROM temp_books";
        switch (date_object.type) {
            case libStatics.DATE_TYPE_BETWEEN:
                SQLQuery += " WHERE date BETWEEN '" + date_object.first_date.year + "-" + date_object.first_date.month + "-" + date_object.first_date.date + "'";
                SQLQuery += " AND '" + date_object.second_date.year + "-" + date_object.second_date.month + "-" + date_object.second_date.date + "'";
                break;
            case libStatics.DATE_TYPE_IN:
                SQLQuery += " WHERE YEAR(date) = " + date_object.date.year;
                if (date_object.date.flags.month_set)
                    SQLQuery += " AND MONTH(date) = " + date_object.date.month;
                break;
            case libStatics.DATE_TYPE_SINCE:
                SQLQuery += " WHERE date > '" + date_object.date.year + "-" + date_object.date.month + "-" + date_object.date.date + "'";
                break;
        }
        SQLQuery += ";";
        console.log(SQLQuery);

        this.connection.query(SQLQuery, (error, results, fields) => {
            if (error)
                throw error;

            let object = {
                type: libStatics.TYPE_ASK,
                data: results.length,
            };
            this.resolve(object);
        });

        this.connection.end();
    };
}


module.exports = analyzer;