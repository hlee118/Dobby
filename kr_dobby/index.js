/*
    Made by Hyunsik Lee
    2019-05-01

    <Theory>
    1. Part of Speech Tagging
    2. Cosine smilarity
*/

let mysql = require('mysql');
let db_info = require('../lib/db');
let analyzer = require('../analyzerKR/analyzer');
const shell_options = {
    mode: 'text',
    pythonPath: '',
    pythonOptions: ['-u'],
    scriptPath: '',
};

function max = (a, b)=>{
    if(a > b) return a;
    else return b;
}

class dobby{
    constructor() {
        this.analyzer = new analyzer();
    }

    ask(query) {
        let POSTResult;
        let documents = new Array();
        analyzer = this.analyzer;
        analyzer.setQuery(query);
        analyzer.partOfSpeechTagging().then((results)=>{
            // Query part of speech tagging
            POSTResult = results;

            // Get data from database
            const connection = mysql.createConnection(db_info);
            const SQLQuery = "SELECT * FROM dobby_q";
            connection.connect((err)=>{if (err) throw err;});
            connection.query(SQLQuery, function(err, rows, fields) {
                if (err) throw err;

                rows.foreach((element)=>{
                    documents.push(element.split(" "));
                });

                return;
                // 명사 동사 형용사 비교
                // 명사구 동사구 형용사구에 대해서 우선도 높게
                // TODO 주어 목적어 서술어...

                // 명사 동사 형용사 형식으로 대신 데이터베이스 설계
                // 비교 분석
            });
            connection.end();
        }).then((promise_args)=>{
            // similarity

            let max_similarity = 0
            for(let i=0;i<documents.length();i++){
                const total = max(len(doc), len(POSTResult))
                let count = 0
            }

                for value in POSTResult:
                    if value in doc:
                        count++
                similarity.append(count/total)

            // shell_options.args = promise_args;
            // PythonShell.run("similarity.py", shell_options, function (err, similarity) {
            //     if (err) throw err;
            //     return similarity;
            // });

        }).then(()=>{

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
