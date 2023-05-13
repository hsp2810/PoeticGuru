import User from "../models/User.js";
import { catchAsyncError } from "../middlewares/catchAsyncErrors.js";

export const getAllUsers = catchAsyncError(async (req, res, next) => {
	const users = await User.find();
	res.status(200).json({
		alert: { type: "success", message: "Users returned succesfully" },
		users,
	});
});

export const deleteAllUsers = catchAsyncError(async (req, res, next) => {
	await User.deleteMany({});

	res.status(200).json({
		alert: { type: "success", message: "All users deleted succesfully" },
	});
});

export const getUserByID = catchAsyncError(async (req, res, next) => {
	const { id } = req.params;
	if (!id) {
		return next(new ErrorHandler("Id not found in req.params", 403));
	}

	const user = await User.findById(id);
	if (!user) {
		return next(new ErrorHandler("User not found based on the ID", 402));
	}

	res.status(200).json({
		alert: { type: "success", message: "User fetched succesfully" },
		user,
	});
});

export const updateUser = catchAsyncError(async (req, res, next) => {
	const { name } = req.body;
	if (!name) {
		return next(new ErrorHandler("Please enter all the credentials", 402));
	}

	const { id } = req.params;
	if (!id) {
		return next(
			new ErrorHandler("User id was not found in the params", 402)
		);
	}

	const updatedUser = await User.findByIdAndUpdate(
		id,
		{ name },
		{ new: true }
	);

	res.status(200).json({
		alert: { type: "success", message: "User updated successfully" },
		updatedUser,
	});
});

export const deleteUser = catchAsyncError(async (req, res, next) => {
	const { id } = req.params;
	if (!id) {
		return next(
			new ErrorHandler("User id was not found in the params", 402)
		);
	}

	await User.findByIdAndDelete(id);

	res.status(200).json({
		alert: { type: "success", message: "User deleted successfully" },
	});
});

// Login User
export const getMyProfile = catchAsyncError(async (req, res, next) => {
	const user = await User.findById(req.rootID);
	if (!user) {
		return next(new ErrorHandler("User not found based on the ID", 402));
	}

	res.status(200).json({
		alert: { type: "success", message: "Fetched Profile successfully" },
		me: user,
	});
});

export const updateMe = catchAsyncError(async (req, res, next) => {
	const { name } = req.body;

	const updatedMe = await User.findByIdAndUpdate(
		req.rootID,
		{ name },
		{ new: true }
	);
	res.status(200).json({
		alert: { type: "success", message: "Edited my Profile successfully" },
		editedMe: updatedMe,
	});
});

export const deleteMe = catchAsyncError(async (req, res, next) => {
	await User.findByIdAndDelete(req.rootID);

	res.status(200).json({
		alert: { type: "success", message: "Deleted me successfully" },
	});
});
