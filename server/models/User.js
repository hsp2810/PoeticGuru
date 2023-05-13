import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { catchAsyncError } from "../middlewares/catchAsyncErrors.js";

const schema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, "Please enter your name"],
	},

	email: {
		type: String,
		required: [true, "Please enter your email"],
		unique: true,
		validate: validator.isEmail,
	},

	password: {
		type: String,
		required: [true, "Please enter your password"],
		minLength: [6, "Password must be atleast 6 characters"],
		select: false,
	},

	role: {
		type: String,
		enum: ["admin", "user"],
		default: "user",
	},

	subscription: {
		id: mongoose.Schema.Types.ObjectId,
		isActive: Boolean,
	},

	resetPasswordToken: String,
	resetPasswordExpire: String,
});

// Hashing the password
schema.pre("save", async function (next) {
	if (this.isModified("password")) {
		this.password = bcrypt.hashSync(this.password, 12);
	}
	next();
});

schema.methods.generateToken = async function () {
	return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
		expiresIn: "15d",
	});
};

schema.methods.getResetToken = async function () {
	const resetToken = crypto.randomBytes(200).toString("hex");
	crypto.createHash("sha256").update(resetToken).digest("hex");

	// Setting the token expire to 15 minutes
	this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

	return resetToken;
};

export default mongoose.model("User", schema);

/*
Notes
1. select: false, //When access the user object from the database we won't get the password by defaul
2. enum: ["admin", "user"] this means that the role can have only 2 values either admin or user
3. subscription: if it is true the user's will be notified else not

Pre functions 
Automatically runs before the data is stored in the database

save() method
*/
