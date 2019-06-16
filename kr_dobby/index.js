/*
    Made by Hyunsik Lee
    2019-05-01

    <Theory>
    1. Part of Speech Tagging
    2. Cosine smilarity

    // TODO 명사 동사 형용사 비교
    // TODO 명사구 동사구 형용사구에 대해서 우선도 높게
    // TODO 주어 목적어 서술어...
*/

let db_path = require('path').join(__dirname, "../lib/db");
let mysql = require('mysql');
let db_info = require(db_path);
const { exec } = require('child_process');

function max(a, b){
    if(a > b) return a;
    else return b;
}

class Dobby{
    constructor() {
        this.docs = new Array();
        this.answers = new Array();
    }

    ask(POSTResult) {
        return new Promise((resolve)=>{
            // Get data from database
            const connection = mysql.createConnection(db_info);
            const SQLQuery = "SELECT * FROM dobby_q";
            connection.connect((err)=>{if (err) throw err;});
            connection.query(SQLQuery, function(err, rows, fields) {
                if (err) throw err;
                resolve(rows);
            });
            connection.end();
        })
        .then((rows)=>{
            for(let i=0;i<rows.length;i++){
                // this.docs.push(rows[i].noun.split(" "));
                this.docs.push(rows[i].words);
                this.answers.push(rows[i].answer);
            }

            // similarity
            let max_similarity = 0
            let index = -1;
            const words_length = POSTResult.length;
            for(let i=0;i<this.docs.length;i++){
                const doc = this.docs[i];
                let count = 0
                for(let j=0;j<words_length;j++){
                    if(doc.includes(POSTResult[j])){
                        count ++;
                    }
                }
                const similarity = count / max(doc.split(" ").length, words_length);
                if(similarity > max_similarity){
                    max_similarity = similarity;
                    index = i;
                }
            }

            return [this.answers[index], max_similarity]
        });
    }
}

module.exports = Dobby;
