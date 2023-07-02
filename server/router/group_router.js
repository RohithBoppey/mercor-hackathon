const Genre = require("../models/Genre");
const Group = require("../models/Group");
const Student = require("../models/Student");

const group_router = require("express").Router();

group_router.get("/", async (req, res) => {
	const allGroups = await Group.find();
	res.json(allGroups);
});

group_router.get("/:genre", async (req, res) => {
	const genre = req.params.genre;
	// console.log(genre);
	const allGenres = await Genre.find({ slug: genre });
	let allGroups = [];
	if (allGenres.length !== 0) {
		// some exists
		const genre_id = allGenres[0]._id;
		// console.log(genre_id);
		allGroups = await Group.find({ genre: genre_id }).populate({
			path: "created_by",
			strictPopulate: false
		});
		console.log(allGroups);
	}
	// console.log(allGroups);
	res.json(allGroups);
});

group_router.post("/new-group", async (req, res) => {
	const { title, description, genre, created_by } = req.body;
	const newGroup = new Group({
		title,
		description,
		genre,
		created_by,
		questions: [],
	});
	await newGroup.save();
	console.log(`${title} Group added successfully`);
	res.sendStatus(200);
});

module.exports = group_router;
