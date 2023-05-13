import mongoose from "mongoose";

export const connectToDB = async (URI) => {
	await mongoose.connect(URI);
	console.log(`Successfully connected to DB`);
};
