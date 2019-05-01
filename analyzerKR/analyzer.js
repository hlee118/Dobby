// modules
let langCommon = require('../lang/common');
let lang = require("../lang/kr");
let {PythonShell} = require('python-shell');
let dobby = require("../kr_dobby/index");
const shell_options = {
    mode: 'text',
    pythonPath: '',
    pythonOptions: ['-u'],
    scriptPath:'',
};

class analyzer {
    constructor(query, storage, resolve) {
        this.connection = mysql.createConnection(db_info);
        this.query = query;
        this.words = query.split(langCommon.SPACE);
        this.storage = storage;
        this.resolve = resolve;
    }

    execute() {
        /*
            <질문 분석>
            형태소 분석 O
            구문 분석 X
            의미 분석 X
            화용 분석 X

            <대답 형성>
            도비
            QA
            WIKI
        */
        new promise((resolve)=>{
            /*
                part of speach tagging(KHAIII)
            */
            shell_options.args = [this.query];
            PythonShell.run('KHAIII_shell.py', shell_options, function(err, results){
                if(err) throw err;
                resolve(results);
            });
        }).then((words)=>{
            /*
                get answers from characters
                dobby, qa, wiki
            */
            let dobby_ans = dobby.ask(words);
            res.send(dobby_ans);
        });
    }

}

module.exports = analyzer;
