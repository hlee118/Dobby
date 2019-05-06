/*
    Made by Hyunsik Lee
    2019-05-01

    <Theory>
    1. Part of Speech Tagging
    2. Database search
*/

let mysql = require('mysql');
let db_info = require('../lib/db');
let analyzer = require('../analyzerKR/analyzer');

class dobby{
    constructor(query) {
        this.analyzer = new analyzer(query);
    }

    ask() {
        return new Promise((resolve)=>{
            // query part of speech tagging
            analyzer = this.analyzer;
            analyzer.partOfSpeechTagging().then((results)=>{
                return results;
            }).then((results)=>{
                // Get data from database
                const connection = mysql.createConnection(db_info);
                const SQLQuery = "SELECT * FROM dobby_q";
                connection.connect((err)=>{if (err) throw err;});
                connection.query(SQLQuery, function(err, rows, fields) {
                    // 명사 동사 형용사 비교
                    // 명사구 동사구 형용사구에 대해서 우선도 높게
                    // TODO 주어 목적어 서술어...

                    // 명사 동사 형용사 형식으로 대신 데이터베이스 설계
                    // 비교 분석

                    if (err) throw err;
                    resolve([results, rows]);
                });
                connection.end();
            });
        });

        // if(this.query.includes("자료")){
        //     this.connection.connect();
        //     let date_object = functions.getDate(this.query);
        //     console.log(date_object);
        //
        //     let SQLQuery = "SELECT * FROM temp_books";
        //     switch (date_object.type) {
        //         case libStatics.DATE_TYPE_BETWEEN:
        //             SQLQuery += " WHERE date BETWEEN '" + date_object.first_date.year + "-" + date_object.first_date.month + "-" + date_object.first_date.date + "'";
        //             SQLQuery += " AND '" + date_object.second_date.year + "-" + date_object.second_date.month + "-" + date_object.second_date.date + "'";
        //             break;
        //         case libStatics.DATE_TYPE_IN:
        //             SQLQuery += " WHERE YEAR(date) = " + date_object.date.year;
        //             if (date_object.date.flags.month_set)
        //                 SQLQuery += " AND MONTH(date) = " + date_object.date.month;
        //             break;
        //         case libStatics.DATE_TYPE_SINCE:
        //             SQLQuery += " WHERE date > '" + date_object.date.year + "-" + date_object.date.month + "-" + date_object.date.date + "'";
        //             break;
        //     }
        //     SQLQuery += ";";
        //     console.log(SQLQuery);
        //
        //     this.connection.query(SQLQuery, (error, results, fields) => {
        //         if (error)
        //             throw error;
        //
        //         let object = {
        //             type: libStatics.TYPE_ASK,
        //             data: results.length,
        //         };
        //         this.resolve(object);
        //     });
        //
        //     this.connection.end();
        //     };
    }
}


module.exports = dobby;
