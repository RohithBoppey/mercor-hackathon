const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ObjectId = Schema.Types.ObjectId;

const CommentSchema = new mongoose.Schema({
	given_by: { type: ObjectId, ref: "users" },
	author: String,
	comment: String,
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

const AnswerSchema = new mongoose.Schema({
	given_by: {
		type: ObjectId,
		ref: "users",
	},
	answer: {
		type: String,
	},
	author: String,
	upvoted_by: {
		type: [{ type: Schema.Types.ObjectId, ref: "users" }],
	},
	comments: {
		type: [{ type: Schema.Types.ObjectId, ref: "comments" }],
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

const QuestionSchema = new mongoose.Schema({
	title: String,
	description: String,
	asked_by: ObjectId,
	author: String,
	createdAt: {
		type: Date,
		default: Date.now,
	},
	answers: [{ type: ObjectId, ref: "answers" }],
});

var Comment = mongoose.model("comments", CommentSchema);
var Answer = mongoose.model("answers", AnswerSchema);
var Question = mongoose.model("questions", QuestionSchema);

module.exports = { Question, Answer, Comment };
