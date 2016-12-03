var Employee = require('../models/Employee.js');


exports.findAllEmployees= function(req, res) {
	
};

exports.findById = function(req,res) {
	res.send("findById");
};

exports.addEmployee= function(req, res) {
	res.send("addEmployee");
};

exports.updateEmployee = function(req,res) {
	res.send("updateEmployee");
};

exports.deleteEmployee = function(req,res) {
	res.send("deleteEmployee");
};