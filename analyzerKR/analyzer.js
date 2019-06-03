/*
    Edited by Hyunsik Lee
    Common Korean analysis class
*/

// modules
let lang = require("../lang/kr");
let {PythonShell} = require('python-shell');
let os = require('os');

const shell_options = {
    mode: 'text',
    pythonPath: '',
    pythonOptions: ['-u'],
    scriptPath: '/home/ubuntu/Dobby/analyzerKR',
};

if (os.type() == "Windows_NT") {
    shell_options.scriptPath = "C:/Users/Lee/Documents/Dobby/analyzerKR";
}

let instance;
class analyzer {
    constructor() {
        if (instance) return instance;

        instance = this;
    }

    setQuery(query){
        instance.query = query;
    }

    // 텍스트 전처리
    tokenization() {
        instance.tokenizedResult = instance.query.split(" ");
    }

    // 형태소 분석
    partOfSpeechTagging() {
        return new Promise((resolve)=>{
            if (instance.taggingResult) return instance.taggingResult;

            // shell_options.args = [this.query];
            let shell = new PythonShell('KoNLPy.py', shell_options);
            shell.send(this.query);
            shell.on('message', function (results) {
                instance.taggingResult = results;
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



module.exports = analyzer;
