import mongoose from "mongoose";

const schema = new mongoose.Schema({
	title: {
		type: String,
		required: [true, "Title is must for a quote"],
		minLength: [5, "Title must be at least 5 characters"],
		maxLength: [80, "Title must be at most 80 characters"],
	},

	quoteMeaning: {
		type: String,
		required: [true, "Quote Meaning is must for a quote"],
	},

	quoteIncident: {
		type: String,
	},

	content: {
		type: String,
		required: [true, "Content is must for a quote"],
		minLength: [50, "Content must be at least 5 characters"],
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

	authorMessage: {
		type: String,
	},

	category: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Category",
		required: true,
	},

	language: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Language",
		required: true,
	},
});

export const Quote = mongoose.model("Quote", schema);
