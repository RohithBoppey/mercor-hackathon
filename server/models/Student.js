// define user schema
const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
	fullname: {
		type: String,
		required: true,
	},
	gender: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	year: {
		type: String,
	},
	password: {
		type: String,
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
	updatedAt: {
		type: Date,
		default: Date.now,
	},
});

// create user model
const Student = mongoose.model("students", studentSchema);

// exporting the model
module.exports = Student;
