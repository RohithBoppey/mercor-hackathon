const mongoose = require("mongoose");

const ObjectId = mongoose.Schema.Types.ObjectId;

const groupSchema = new mongoose.Schema({
	title: String,
	description: String,
	genre: { type: ObjectId, ref: "genres" },
	created_by: {type: ObjectId, ref: "students"},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

const Group = mongoose.model("group", groupSchema);

module.exports = Group;
