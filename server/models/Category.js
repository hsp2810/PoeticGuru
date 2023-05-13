import mongoose from "mongoose";

const schema = new mongoose.Schema({
	name: {
		type: String,
		default: "all",
	},

	categoryOf: {
		type: String,
		enum: ["poems", "quotes", "stories"],
		required: true,
	},
});

export const Category = mongoose.model("Category", schema);
