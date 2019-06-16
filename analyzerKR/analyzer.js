/*
    Edited by Hyunsik Lee
    Common Korean analysis class
*/

// modules
let lang = require("../lang/kr");
let {PythonShell} = require('python-shell');
let os = require('os');

class Analyzer {
    constructor() {
        this.shell_options = {
            mode: 'text',
            pythonPath: '',
            pythonOptions: ['-u'],
            scriptPath: '/home/ubuntu/Dobby/analyzerKR',
        };

        if (os.type() == "Windows_NT") {
            shell_options.scriptPath = "C:/Users/Lee/Documents/Dobby/analyzerKR";
        }
    }

    setQuery(query){
        this.query = query;
    }

    // 텍스트 전처리
    tokenization() {
        this.tokenizedResult = this.query.split(" ");
    }

    // 형태소 분석
    partOfSpeechTagging() {
        return new Promise((resolve)=>{
            if (this.taggingResult) return this.taggingResult;

            // shell_options.args = [this.query];
            let shell = new PythonShell('KoNLPy.py', this.shell_options);
            shell.send(this.query);
            shell.on('message', function (results) {
                this.taggingResult = results;
                resolve(results);
            });

            // end the input stream and allow the process to exit
            shell.end(function (err,code,signal) {
              if (err) throw err;
            });
        });
    }

    // TODO 구문 분석

    // TODO 의미 분석

    // TODO 화용 분석
};



module.exports = Analyzer;
