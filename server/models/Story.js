import mongoose from "mongoose";

const schema = new mongoose.Schema({
	title: {
		type: String,
		required: [true, "Title is must for a story"],
		minLength: [5, "Title must be at least 5 characters"],
		maxLength: [80, "Title must be at most 80 characters"],
	},

	content: {
		type: String,
		required: [true, "Content is must for a story"],
		minLength: [5, "Content must be at least 5 characters"],
	},

	postedOn: {
		type: Date,
		default: Date.now,
	},

	likes: {
		type: Number,
		default: 0,
	},

	views: {
		type: Number,
		default: 0,
	},

	author: {
		type: String,
		required: [true, "Please enter the write name"],
	},

	description: {
		type: String,
		required: [true, "Description is must for a story"],
		minLength: [20, "Description must be at least 5 characters"],
	},

	category: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Category",
		required: [true, "Category is must for a story"],
	},

	language: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Language",
		required: true,
	},
});

export const Story = mongoose.model("Story", schema);
