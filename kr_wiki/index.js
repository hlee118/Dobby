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

    ask(){
        return new Promise((resolve)=>{

            // shell_options.args = [this.query];
            let shell = new PythonShell('wiki.py', this.shell_options);
            shell.send("홍익대학교");
            shell.on('message', function (results) {
                const result_split = results.split(' ');
                resolve(result_split);
            });

            // end the input stream and allow the process to exit
            shell.end(function (err,code,signal) {
              if (err) throw err;
            });
        })
    }
}

module.exports = Wiki;
