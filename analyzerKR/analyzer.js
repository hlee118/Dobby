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
    scriptPath: '',
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

            shell_options.args = [this.query];
            PythonShell.run("KoNLPy.py", shell_options, function (err, results) {
                if (err) throw err;
                instance.taggingResult = results;
                resolve(results);
            });
        });
    }

    // TODO 구문 분석

    // TODO 의미 분석

    // TODO 화용 분석
};

module.exports = analyzer;
