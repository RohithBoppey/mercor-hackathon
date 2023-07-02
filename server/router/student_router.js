require("dotenv").config();
const Student = require("../models/Student");
const TempStudent = require("../models/Temp");

const student_router = require("express").Router();

const nodemailer = require("nodemailer");

let smtpTransport = nodemailer.createTransport({
	service: "Gmail",
	auth: {
		user: process.env.Gmail,
		pass: process.env.Password,
	},
});

student_router.get("/all-students", async (req, res) => {
	const students = await Student.find();
	res.json(students);
});

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
	if (user === null) {
		// hence no user
		// we need to save

		TempStudent(req.body)
			.save()
			.then((newuser) => {
				let link =
					"http://" +
					req.get("host") +
					"/otp/verify?id=" +
					newuser._id;
				smtpTransport.sendMail(
					{
						to: req.body.email,
						subject: "Confirmation Email",
						html:
							"Hello " +
							req.body.fullname +
							"<br> Please click on the link to verify your email.<br><a href=" +
							link +
							">Click here to verify</a>",
					},
					(err) => {
						if (err) {
							TempStudent.findByIdAndDelete(newuser._id);
							res.send(
								"Unable to process your request try after sometime."
							);
						} else
							res.send(
								"An Email has been sent to verify your email address,Login after verification."
							);
					}
				);
			})
			.catch((err) => {
				console.log(err)
				res.send("Unable to process your request try after sometime.");
			});
	} else {
		res.send(
			"You have already previously registered! Please login using the same email."
		);
	}
});

student_router.get("/find/:id", async (req, res) => {
	const user = await Student.find({ _id: req.params.id });
	res.json(user);
});

module.exports = student_router;
