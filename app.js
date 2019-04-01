// modules
let express = require('express');
let app = express();
let path = require('path');
let bodyParser = require('body-parser');
let https = require('https');
const fs = require('fs');
const options = {
    ca: fs.readFileSync('./https/fullchain.pem'),
    key: fs.readFileSync('./https/privkey.pem'),
    cert: fs.readFileSync('./https/cert.pem')
};
let server = https.createServer(options, app)
let port = 443;
let dialogflow = require('./dialogflow')

// routers path
let indexRouter = require('./routes/index');
let pageRouter = require('./routes/page');

let {PythonShell} = require('python-shell');
const options = {
	mode: 'text',
	pythonPath: '',
	pythonOptions: ['-u'],
	scriptPath:'',
	args:["안녕, 세상"],
};

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname, 'public')));

// router
app.get('/', (req, res) => {
	PythonShell.run('shell.py', options, function(err, results){
		if(err) throw err;
    res.send("result: %j", results);
	});
});

app.post('/fulfillment', dialogflow)
// app.use('/', indexRouter)
// app.use('/page', pageRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    res.status(404).send('Sorry cant find that!');
});

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error('requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error('port is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

function onListening() {
    console.log('Listening on port ' + port);
}
