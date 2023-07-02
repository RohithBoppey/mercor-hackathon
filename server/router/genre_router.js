const Genre = require("../models/Genre");

const genre_router = require("express").Router();

genre_router.get("/all", async (req, res) => {
	const allGenres = await Genre.find();
	res.json(allGenres);
});

module.exports = genre_router;
