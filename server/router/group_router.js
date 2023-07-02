const Group = require("../models/Group");

const group_router = require("express").Router();

group_router.get("/", async (req, res) => {
	const allGroups = await Group.find();
	res.json(allGroups);
});

group_router.get('/:genre', async (req, res) => {
	const genre = req.params.genre;
	const allGroups = await Group.find({genre: genre});
	res.json(allGroups);
});

group_router.post("/new-group", async (req, res) => {
	const { title, description, genre, created_by } = req.body;
	const newGroup = new Group({
		title,
		description,
		genre,
		created_by,
	});
	await newGroup.save();
	res.sendStatus(200);
});

module.exports = group_router;
