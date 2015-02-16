// Setting up config objects first
conf_file   = require('./config'),
helper 		= require('./helpers/helper'),
global.sysinfo = helper.gethostname();
global.conf = helper.getconf(conf_file);

// Requiring dependencies
var express = require('express'),
	bodyParser = require('body-parser');
	UserController = require('./server/controller/user');

// Checking if config file exists
if ((conf == undefined) && !conf) {
  console.log('Set NODE_ENV to dev or prod.  Exiting...');
  process.exit(1);
}

// Notify user
console.log('Running ' + process.env.NODE_ENV + ' environment');



var app = express();
app.set('view engine', 'jade');
app.set('views', __dirname + '/views');
app.use(bodyParser());

// Custom Routes 

// Entry point for Layouts
app.get('/', function(req, res){
	res.send('hello world');
})

app.get('/register', function(req, res){
	res.render('client/index');
})

// REST API'S
app.post('/api/register', UserController.register);

// Listening to port
app.listen(conf.port, function(){
	console.log('Listening at 1337');
})