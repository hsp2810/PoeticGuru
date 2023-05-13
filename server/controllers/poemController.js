import { catchAsyncError } from "../middlewares/catchAsyncErrors.js";
import { Category } from "../models/Category.js";
import { Language } from "../models/Lanugage.js";
import { Poem } from "../models/Poem.js";
import ErrorHandler from "../utils/errorHandler.js";

export const insertPoem = catchAsyncError(async (req, res, next) => {
	const {
		title,
		description,
		content,
		category_name,
		language_name,
		author,
		authorMessage,
	} = req.body;

	if (
		!title ||
		!description ||
		!content ||
		!author ||
		!language_name ||
		!category_name
	) {
		return next(
			new ErrorHandler("Please enter all the poem credentials", 401)
		);
	}

	let category = await Category.findOne({
		name: category_name,
		categoryOf: "poems",
	});
	let new_category;
	if (!category) {
		new_category = new Category({
			name: category_name,
			categoryOf: "poems",
		});
		await new_category.save();
	}

	let language = await Language.findOne({
		name: language_name,
		languageOf: "poems",
	});
	let new_language;
	if (!language) {
		new_language = new Language({
			name: language_name,
			languageOf: "poems",
		});
		await new_language.save();
	}

	const poem = new Poem({
		title,
		description,
		content,
		category: category ? category._id : new_category._id,
		language: language ? language._id : new_language._id,
		author,
		authorMessage,
	});
	await poem.save();

	res.status(200).json({
		alert: { type: "success", message: "Poem inserted successfully" },
		poem,
	});
});

export const updatePoem = catchAsyncError(async (req, res, next) => {
	const { id } = req.params;
	if (!id) {
		return next(
			new ErrorHandler("Poem id was not found in the params", 402)
		);
	}

	const {
		title,
		description,
		content,
		category_name,
		language_name,
		author,
		authorMessage,
	} = req.body;

	if (
		!title ||
		!description ||
		!content ||
		!author ||
		!language_name ||
		!category_name
	) {
		return next(
			new ErrorHandler("Please enter all the poem credentials", 401)
		);
	}

	const category = await Category.findOne({
		name: category_name,
		categoryOf: "poems",
	});
	if (!category) {
		return next(
			new ErrorHandler(
				"Category don't exist. Create a new category first.",
				501
			)
		);
	}
	const language = await Language.findOne({
		name: language_name,
		languageOf: "poems",
	});
	if (!language) {
		return next(
			new ErrorHandler(
				"Language don't exist. Create a new language first.",
				501
			)
		);
	}

	const editedPoem = await Poem.findByIdAndUpdate(
		id,
		{
			title,
			description,
			content,
			category: category._id,
			language: language._id,
			author,
			authorMessage,
		},
		{ new: true }
	);
	if (!editedPoem) {
		return next(new ErrorHandler("Poem not found", 410));
	}

	res.status(200).json({
		alert: { type: "success", message: "Poem edited successfully" },
		editedPoem,
	});
});

export const deletePoem = catchAsyncError(async (req, res, next) => {
	const { id } = req.params;
	if (!id) {
		return next(
			new ErrorHandler("Poem id was not found in the params", 402)
		);
	}

	const deletedPoem = await Poem.findByIdAndDelete(id);
	if (!deletedPoem) {
		return next(new ErrorHandler("Poem not found", 410));
	}

	res.status(200).json({
		alert: { type: "success", message: "Poem deleted successfully" },
	});
});

export const getPoemByID = catchAsyncError(async (req, res, next) => {
	const { id } = req.params;
	if (!id) {
		return next(
			new ErrorHandler("Poem id was not found in the params", 402)
		);
	}

	let poem = await Poem.findById(id)
		.populate("category")
		.populate("language");

	if (!poem) {
		return next(new ErrorHandler("Poem not found", 410));
	}

	// const lines = poem.content.split("\n");
	// poem.content = new Array(lines.length);
	// poem.content = lines;

	// let lines = poem.content.split("\n");
	// poem.content = lines;

	// await poem.save();

	res.status(200).json({
		alert: { type: "success", message: "Poem fetched successfully" },
		poem,
	});
});

export const getAllPoems = catchAsyncError(async (req, res, next) => {
	const poems = await Poem.find().populate("category").populate("language");

	if (!poems || poems.length === 0) {
		return next(new ErrorHandler("No poems exist", 410));
	}

	res.status(200).json({
		alert: {
			type: "success",
			message: "Fetched all the poems successfully",
		},
		poems,
	});
});

export const increaseViews = catchAsyncError(async (req, res, next) => {
	const { id } = req.params;
	if (!id) {
		return next(
			new ErrorHandler("Poem id was not found in the params", 402)
		);
	}

	let poem = await Poem.findById(id);
	if (!poem) {
		return next(new ErrorHandler("Poem not found", 410));
	}

	poem.views = poem.views + 1;
	poem.save();

	res.status(200).json({
		alert: {
			type: "success",
			message: "Increased view successfully",
		},
		views: poem.views,
	});
});

export const increaseLikes = catchAsyncError(async (req, res, next) => {
	const { id } = req.params;
	if (!id) {
		return next(
			new ErrorHandler("Poem id was not found in the params", 402)
		);
	}

	let poem = await Poem.findById(id);
	if (!poem) {
		return next(new ErrorHandler("Poem not found", 410));
	}

	poem.likes = poem.likes + 1;
	poem.save();

	res.status(200).json({
		alert: {
			type: "success",
			message: "Increased likes successfully",
		},
		likes: poem.likes,
	});
});

export const getPoemsPast24 = catchAsyncError(async (req, res, next) => {
	const poems = await Poem.find().populate("category").populate("language");

	if (!poems || poems.length === 0) {
		return next(new ErrorHandler("No poems exist", 410));
	}

	const currentTime = Date.now();
	const filteredPoems = poems.filter((poem) => {
		return Math.round((currentTime - poem.postedOn) / 3600000) <= 24;
	});

	res.status(200).json({
		alert: {
			type: "success",
			message:
				"Fetched all the poems uploaded in the last 24 hours successfully",
		},
		poems: filteredPoems,
	});
});

export const getFavourites = catchAsyncError(async (req, res, next) => {
	res.status(200).json({
		alert: {
			type: "success",
			message:
				"Fetched all the poems uploaded in the last 24 hours successfully",
		},
	});
});
