/*
    Made by Jaehun Ah
    2019-05-01

    <Theory>
    TF-IDF
*/

let {PythonShell} = require('python-shell');
let os = require('os');

class Wiki{
    constructor() {
        this.docs = new Array();
        this.answers = new Array();

        this.shell_options = {
            mode: 'text',
            pythonPath: '',
            pythonOptions: ['-u'],
            scriptPath: '/home/ubuntu/Dobby/kr_wiki',
        };

        if (os.type() == "Windows_NT") {
            shell_options.scriptPath = "C:/Users/Lee/Documents/Dobby/kr_wiki";
        }
    }

    ask(query){
        return new Promise((resolve)=>{

            // shell_options.args = [this.query];
            let file_name = "wiki.py";
            if(query.split(' ').length > 1){
                // file_name = "TF-IDF.py";
                resolve(["찾을 수 없습니다", 0])
            }

            this.shell_options.args = [query];
            PythonShell.run(file_name, this.shell_options, function (err, results) {
                if (err) throw err;
                resolve(results)
            });
        })
    }
}

module.exports = Wiki;
