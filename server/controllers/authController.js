import { catchAsyncError } from "../middlewares/catchAsyncErrors.js";
import User from "../models/User.js";
import ErrorHandler from "../utils/errorHandler.js";
import bcrypt from "bcryptjs";

export const register = catchAsyncError(async (req, res, next) => {
	const { email, password, name, role } = req.body;

	if (!email || !password || !name) {
		return next(new ErrorHandler("Please input all the fields", 400));
	}

	const alreadyExist = await User.findOne({ email });
	if (alreadyExist) {
		return next(
			new ErrorHandler("User with the same email already exists", 409)
		);
	}

	const user = await User.create({
		name,
		email,
		password,
		role,
	});

	// Hash the password enter by the user

	const savedUser = await user.save();

	res.status(200).json({
		alert: {
			type: "success",
			message: "User registered successfully. Good to login",
		},
		savedUser,
	});
});

export const login = catchAsyncError(async (req, res, next) => {
	const { email, password } = req.body;

	if (!email || !password) {
		return next(new ErrorHandler("Please input both the fields", 400));
	}

	/*
    MIMP: Because in User.js we have wrote select: false as we don't want the password by default.
    */
	const user = await User.findOne({ email }).select("+password");
	if (!user) {
		return next(new ErrorHandler("Incorrect Credentials", 409));
	}

	// Comparing the passwords
	if (!bcrypt.compareSync(password, user.password)) {
		return next(new ErrorHandler("Incorrect Credentials", 409));
	}

	// Generate the token for the user
	const token = await user.generateToken();

	// Cookie options
	const cookieOptions = {
		expires: new Date(Date.now() + 99999999),
		httpOnly: true,
	};

	// sending the cookies back to the browser
	res.status(200)
		.cookie("poetAuthCookies", token, cookieOptions)
		.json({
			alert: {
				type: "success",
				message: "Login successful",
				cookies: token,
			},
		});
});

export const logout = catchAsyncError(async (req, res, next) => {
	const cookies = req.cookies;
	console.log(cookies);

	// Remove the cookies
	res.status(200)
		.clearCookie("poetAuthCookies", { expires: new Date(Date.now()) })
		.json({ alert: { type: "success", message: "Logout Successfull" } });
});

export const authenticate = catchAsyncError(async (req, res, next) => {
	const user = req.rootUser;

	res.status(200).json({
		alert: { type: "success", message: "User authentication completed" },
		user,
	});
});
