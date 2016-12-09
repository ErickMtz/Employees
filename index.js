var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var mongoose = require('mongoose');
var path = require('path');
var ejs= require('ejs');
var employeesController = require('./controllers/employeesController.js');

var app = express();
var employees = express.Router();

/// Connection to database
mongoose.connect('mongodb://localhost/employees');

var db = mongoose.connection;

db.on('error', console.log.bind(console, 'connection error:'));

db.once('open', function() {
  console.log('Connection Success');
});

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(methodOverride());
app.use('/api',employees);

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'node_modules')));

app.use('/public', express.static(__dirname + '/public/'));
app.use('/angular', express.static(__dirname + '/node_modules/angular/'));
app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist/css/'));
app.use('/javascripts', express.static(__dirname + '/node_modules/bootstrap/dist/js/'));
app.use('/views', express.static(__dirname + '/views'));


app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.get('/', function(req, res) {
	res.render('layouts/layout.html');
});

employees.route('/employees')
.get(employeesController.findAllEmployees)
.post(employeesController.addEmployee);

employees.route('/employees/:id')
.get(employeesController.findById)
.put(employeesController.updateEmployee)
.delete(employeesController.deleteEmployee);

var server = app.listen(3000, function(){
	console.log('Express server listening in port: ' + server.address().port);
});