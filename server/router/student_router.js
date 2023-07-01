const Student = require('../models/Student');

const student_router = require('express').Router();

student_router.get('/all-students', async (req, res) => {
    const students = await Student.find();
	res.json(students);
})

student_router.post("/login", async (req, res) => {
	const student = await Student.findOne({
		email: req.body.email,
		password: req.body.password,
	});
	console.log(student);
	if (student == null) {
		res.send("Credentials did not match, sorry! Please try again");
	} else {
		res.send(student);
	}
});

student_router.post("/register", async (req, res) => {
	let user = await Student.findOne({
		email: req.body.email,
	});
	console.log(user);
	let newUser = null;
	if (user === null) {
		// hence no user
		// we need to save
		console.log(req.body);
		newUser = await Student.create({
			fullname: req.body.fullname,
			gender: req.body.gender,
			email: req.body.email,
			year: req.body.year,
			password: req.body.password,
		});
		newUser.save();
		user = newUser;
	} else {
		user =
			"You have already previously registered! Please login using the same email.";
	}
	res.send(user);
});

module.exports = student_router;