/*
    Made by Jaehun Ah
    2019-05-01

    <Theory>
    TF-IDF
*/

let {PythonShell} = require('python-shell');
const shell_options = {
    mode: 'text',
    pythonPath: '',
    pythonOptions: ['-u'],
    scriptPath:'',
};

class wiki{
    constructor(query) {
        this.query = query;
    }

    ask(){
        shell_options.args = [this.query];
        PythonShell.run('jaehun_code.py', shell_options, function(err, results){
          if(err) throw err;
          return results;
        });
    }
}

module.exports = wiki;
