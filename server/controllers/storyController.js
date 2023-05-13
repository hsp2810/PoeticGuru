import { catchAsyncError } from "../middlewares/catchAsyncErrors.js";
import { Category } from "../models/Category.js";
import { Language } from "../models/Lanugage.js";
import { Story } from "../models/Story.js";
import ErrorHandler from "../utils/errorHandler.js";

export const insertStory = catchAsyncError(async (req, res, next) => {
	const {
		title,
		content,
		author,
		description,
		category_name,
		language_name,
	} = req.body;

	console.log("Printing the content of the story: ", content);
	if (
		!title ||
		!content ||
		!author ||
		!description ||
		!language_name ||
		!category_name
	) {
		return next(
			new ErrorHandler("Please enter all the quote credentials", 401)
		);
	}

	let category = await Category.findOne({
		name: category_name,
		categoryOf: "stories",
	});
	let new_category;
	if (!category) {
		new_category = new Category({
			name: category_name,
			categoryOf: "stories",
		});
		await new_category.save();
	}

	let language = await Language.findOne({
		name: language_name,
		languageOf: "stories",
	});
	let new_language;
	if (!language) {
		new_language = new Language({
			name: language_name,
			languageOf: "stories",
		});
		await new_language.save();
	}

	const story = await Story.create({
		title,
		content,
		author,
		description,
		category: category ? category._id : new_category._id,
		language: language ? language._id : new_language._id,
	});
	await story.save();

	res.status(200).json({
		alert: { type: "success", message: "Story inserted successfully" },
		story,
	});
});

export const updateStory = catchAsyncError(async (req, res, next) => {
	const { id } = req.params;
	if (!id) {
		return next(
			new ErrorHandler("Story id was not found in the params", 402)
		);
	}

	const {
		title,
		content,
		quoteMeaning,
		quoteIncident,
		category_name,
		language_name,
		author,
	} = req.body;

	if (
		!title ||
		!quoteMeaning ||
		!content ||
		!author ||
		!language_name ||
		!category_name
	) {
		return next(
			new ErrorHandler("Please enter all the quote credentials", 401)
		);
	}

	const category = await Category.findOne({
		name: category_name,
		categoryOf: "stories",
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
		languageOf: "stories",
	});
	if (!language) {
		return next(
			new ErrorHandler(
				"Language don't exist. Create a new language first.",
				501
			)
		);
	}

	const editedStory = await Story.findByIdAndUpdate(
		id,
		{
			title,
			content,
			quoteMeaning,
			quoteIncident,
			category: category ? category._id : new_category._id,
			language: language ? language._id : new_language._id,
			author,
		},
		{ new: true }
	);
	if (!editedStory) {
		return next(new ErrorHandler("Story not found", 410));
	}

	res.status(200).json({
		alert: { type: "success", message: "Story edited successfully" },
		editedStory,
	});
});

export const deleteStory = catchAsyncError(async (req, res, next) => {
	const { id } = req.params;
	if (!id) {
		return next(
			new ErrorHandler("Story id was not found in the params", 402)
		);
	}

	const deletedStory = await Story.findByIdAndDelete(id);
	if (!deletedStory) {
		return next(new ErrorHandler("Story not found", 410));
	}

	res.status(200).json({
		alert: { type: "success", message: "Story deleted successfully" },
	});
});

export const getStoryByID = catchAsyncError(async (req, res, next) => {
	const { id } = req.params;
	if (!id) {
		return next(
			new ErrorHandler("Story id was not found in the params", 402)
		);
	}

	let quote = await Story.findById(id)
		.populate("category")
		.populate("language");

	if (!quote) {
		return next(new ErrorHandler("Story not found", 410));
	}

	res.status(200).json({
		alert: { type: "success", message: "Story fetched successfully" },
		quote,
	});
});

export const getAllStories = catchAsyncError(async (req, res, next) => {
	const stories = await Story.find()
		.populate("category")
		.populate("language");

	if (!stories || stories.length === 0) {
		return next(new ErrorHandler("No stories exist", 410));
	}

	res.status(200).json({
		alert: {
			type: "success",
			message: "Fetched all the stories successfully",
		},
		stories,
	});
});

export const increaseViews = catchAsyncError(async (req, res, next) => {
	const { id } = req.params;
	if (!id) {
		return next(
			new ErrorHandler("Story id was not found in the params", 402)
		);
	}

	let quote = await Story.findById(id);
	if (!quote) {
		return next(new ErrorHandler("Story not found", 410));
	}

	quote.views = quote.views + 1;
	quote.save();

	res.status(200).json({
		alert: {
			type: "success",
			message: "Increased views successfully",
		},
		views: quote.views,
	});
});

export const increaseLikes = catchAsyncError(async (req, res, next) => {
	const { id } = req.params;
	if (!id) {
		return next(
			new ErrorHandler("Story id was not found in the params", 402)
		);
	}

	let quote = await Story.findById(id);
	if (!quote) {
		return next(new ErrorHandler("Story not found", 410));
	}

	quote.likes = quote.likes + 1;
	quote.save();

	res.status(200).json({
		alert: {
			type: "success",
			message: "Increased likes successfully",
		},
		likes: quote.likes,
	});
});

export const getStoriesPast24 = catchAsyncError(async (req, res, next) => {
	const stories = await Story.find()
		.populate("category")
		.populate("language");

	if (!stories || stories.length === 0) {
		return next(new ErrorHandler("No stories exist", 410));
	}

	const currentTime = Date.now();
	const filteredStories = stories.filter((story) => {
		return Math.round((currentTime - story.postedOn) / 3600000) <= 24;
	});

	res.status(200).json({
		alert: {
			type: "success",
			message:
				"Fetched all the stories uploaded in the last 24 hours successfully",
		},
		stories: filteredStories,
	});
});

export const getFavourites = catchAsyncError(async (req, res, next) => {
	res.status(200).json({
		alert: {
			type: "success",
			message:
				"Fetched all the stories uploaded in the last 24 hours successfully",
		},
	});
});
