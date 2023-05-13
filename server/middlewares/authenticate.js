import User from "../models/User.js";
import ErrorHandler from "../utils/errorHandler.js";
import { catchAsyncError } from "./catchAsyncErrors.js";
import jwt from "jsonwebtoken";

export const Authenticate = catchAsyncError(async (req, res, next) => {
	const { poetAuthCookies } = req.cookies;
	if (!poetAuthCookies) {
		return next(new ErrorHandler("Cookies not found", 401));
	}

	const verfiedUser = jwt.verify(poetAuthCookies, process.env.JWT_SECRET);
	if (!verfiedUser) {
		return next(
			new ErrorHandler("User is not verified. False token found.", 410)
		);
	}

	const user_id = verfiedUser._id;

	const rootUser = await User.findById(user_id);
	if (!rootUser) {
		return next(new ErrorHandler("User not found based on the ID", 408));
	}

	req.rootID = user_id;
	req.rootUser = rootUser;

	next();
});

export const AdminAuthenticate = catchAsyncError(async (req, res, next) => {
	const user = req.rootUser;
	// console.log(
	// 	"Printing the user when checking whether he is an admin or not: ",
	// 	user
	// );
	if (!(user.role === "admin")) {
		return next(new ErrorHandler("User login is not an admin.", 404));
	}

	next();
});
