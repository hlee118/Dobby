/*
    Made by Hyunsik Lee
    2019-05-01

    <Theory>
    1. Part of Speech Tagging
    2. Cosine smilarity
*/

"use strict";
let path = require('path').join(__dirname);
let mysql = require('mysql');
let db_info = require(path, "../lib/db");
let analyzer = require(path, '../analyzerKR/analyzer');

const shell_options = {
    mode: 'text',
    pythonPath: '',
    pythonOptions: ['-u'],
    scriptPath: '',
};

const { exec } = require('child_process');

function max(a, b){
    if(a > b) return a;
    else return b;
}

class Dobby{
    constructor() {
        this.analyzer = new analyzer();
        this.POSTResult = new Array();
        this.docs = new Array();
        this.answers = new Array();
    }

    ask(query) {
        // console.log("질문: " + query);
        analyzer = this.analyzer;
        analyzer.setQuery(query);
        analyzer.partOfSpeechTagging()
        .then((results)=>{
            // Query part of speech tagging
            const re_split = results.split('\'');
            for(let i=0;i<re_split.length;i++){
                if(i % 2 == 1)
                    this.POSTResult.push(re_split[i]);
            }
            return this.getDataFromDB();
        })
        .then((rows)=>{
            for(let i=0;i<rows.length;i++){
                // this.docs.push(rows[i].noun.split(" "));
                this.docs.push(rows[i].words);
                this.answers.push(rows[i].answer);
            }
            // 명사 동사 형용사 비교
            // 명사구 동사구 형용사구에 대해서 우선도 높게
            // TODO 주어 목적어 서술어...

            // 명사 동사 형용사 형식으로 대신 데이터베이스 설계
            // 비교 분석

            // similarity
            let max_similarity = 0
            let index = -1;
            const words_length = this.POSTResult.length;
            for(let i=0;i<this.docs.length;i++){
                const doc = this.docs[i];
                let count = 0
                for(let j=0;j<words_length;j++){
                    if(doc.includes(this.POSTResult[j])){
                        count ++;
                    }
                }
                const similarity = count / max(doc.split(" ").length, words_length);
                if(similarity > max_similarity){
                    max_similarity = similarity;
                    index = i;
                }
            }

            console.log("정확도: " + max_similarity);
            console.log("정답: " + this.answers[index]);

            // shell_options.args = promise_args;
            // PythonShell.run("similarity.py", shell_options, function (err, similarity) {
            //     if (err) throw err;
            //     return similarity;
            // });

        });
    }

    getDataFromDB(){
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
        });
    }
}

let dobby = new Dobby();
dobby.ask(process.argv[2])

module.exports = dobby;
