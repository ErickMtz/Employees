var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var employeeSchema = new Schema({
	employee_id: Number,
	name: String,
	last_name: String,
	rfc: String,
	gender: String,
	birth_date: Date,
	phone_number: Number,
	email: String,
	employment: String,
	hire_date: Date,
	salary: Number
});

module.exports = mongoose.model('Employee', employeeSchema);