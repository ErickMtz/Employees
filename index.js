var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var mongoose = require('mongoose');
var employeesController = require('./controllers/employeesController.js');

var app = express();
var employees = express.Router();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(methodOverride());
app.use('/api',employees);

app.get('/', function(req, res) {
	res.send('Hello');
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