const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
let cors = require("cors");

const mongoURL = process.env.MONGO_URL;

// create express app
const app = express();

// parse requests of content-type - application/json
app.use(bodyParser.json());

// set up MongoDB connection
mongoose
	.connect(mongoURL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log("Connected to MongoDB"))
	.catch((err) => console.error("Could not connect to MongoDB", err));

app.use(cors());

const student_router = require("./router/student_router");

app.use("/students", student_router);



// start server
const PORT = 5000;
app.listen(PORT, () => {
	console.log(`Server started on port ${PORT}`);
});
