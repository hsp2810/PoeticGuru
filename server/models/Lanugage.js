import mongoose from "mongoose";

const schema = new mongoose.Schema({
	name: {
		type: String,
		enum: ["hindi", "english"],
		required: [true, "Language name is a must"],
	},

	languageOf: {
		type: String,
		enum: ["poems", "quotes", "stories"],
		required: [true, "Type for language is a must"],
	},
});

export const Language = mongoose.model("Language", schema);
