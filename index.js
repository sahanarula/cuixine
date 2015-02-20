// Setting up config objects first
conf_file   = require('./config'),
helper 		= require('./helpers/helper'),
global.sysinfo = helper.gethostname();
global.conf = helper.getconf(conf_file);

// Requiring dependencies
var express = require('express'),
	bodyParser = require('body-parser'),
	mongoose = require('mongoose'),
	UserController = require('./server/controller/user'),
	InvitationController = require('./server/controller/invitation'),
	User = require('./server/models/user');

// Checking if config file exists
if ((conf == undefined) && !conf) {
  console.log('Set NODE_ENV to dev or prod.  Exiting...');
  process.exit(1);
}

// DB connection

mongoose.connect(conf.dburl, function(err, connection){
	if(err) console.log(err);
	if(connection) console.log(connection);
});

// Notify user
console.log('Running ' + process.env.NODE_ENV + ' environment');



var app = express();
app.set('view engine', 'jade');
app.set('views', __dirname + '/views');
app.use(bodyParser());

// Custom Routes 

// Entry point for Layouts
app.get('/', function(req, res){
	res.send('hey there!');
})

app.get('/register', function(req, res){
	res.render('client/index');
})

app.get('/invitation/new', function(req, res){
	res.render('server/newInvitation');
})

// REST API'S
//register route
app.post('/api/register', UserController.register);

//invitation route
app.post('/api/invitation/create', InvitationController.create);

// Listening to port
app.listen(conf.port, function(){
	console.log('Listening at 1337');
})
