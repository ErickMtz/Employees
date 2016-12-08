var Employee = require('../models/Employee.js');


exports.findAllEmployees= function(req, res) {

	Employee.find(function(error, employeeList) {
		if(error) {
			res.send(500, error.message);
		}

		res.status(200).jsonp(employeeList);
	});
};

exports.findById = function(req, res) {
	
	var id = req.params.id;

	
	Employee.find({employee_id: id}, function(error, found){
		if(error){
			res.send(500, error.message);
		}

		res.status(200).jsonp(found);
	});
	
};

exports.addEmployee = function(req, res) {
	
	var employee = new Employee({
		employee_id: req.body.employee_id,
		name: req.body.name,
		last_name: req.body.last_name,
		rfc: req.body.rfc,
		gender: req.body.gender,
		birthday: req.body.birthday,
		phone_number: req.body.phone_number,
		email: req.body.email,
		employment: req.body.employment,
		hire_date: req.body.hire_date,
		salary: req.body.salary
	})

	employee.save(function(error, employee){
		if(error) {
			res.send(500, error.message);
		}

		res.status(200).jsonp(employee);
	});

};

exports.updateEmployee = function(req, res) {
	var id = req.params.id;
	Employee.findOneAndUpdate({ employee_id: id}, { $set: { employee_id: req.body.employee_id, 
														 	name: req.body.name,
															last_name: req.body.last_name,
															rfc: req.body.rfc,
															gender: req.body.gender,
															birthday: req.body.birthday,
															phone_number: req.body.phone_number,
															email: req.body.email,
															employment: req.body.employment,
															hire_date: req.body.hire_date,
															salary: req.body.salary}}, 
															{new: true}, 
															function(error, productUpdated){
														 		if(error) {
														 			res.send(500, error.message);
														 		}
														 		res.status(200).jsonp(productUpdated);
														 	});	
};

exports.deleteEmployee = function(req, res) {
	var id = req.params.id;
	Employee.findOneAndRemove({employee_id: id}, function(error, deleted){
		if(error) {
			res.send(500, error.message);
		}

		res.status(200).jsonp();
	});
};