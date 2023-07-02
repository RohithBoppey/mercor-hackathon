const mongoose = require("mongoose");

const genreSchema = new mongoose.Schema({
	name: String,
	slug: String,
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

const Genre = mongoose.model("genre", genreSchema);
module.exports = Genre; 
