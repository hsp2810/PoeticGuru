import { catchAsyncError } from "../middlewares/catchAsyncErrors.js";
import { Category } from "../models/Category.js";
import { Language } from "../models/Lanugage.js";
import { Quote } from "../models/Quote.js";
import ErrorHandler from "../utils/errorHandler.js";

export const insertQuote = catchAsyncError(async (req, res, next) => {
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

	let category = await Category.findOne({
		name: category_name,
		categoryOf: "quotes",
	});
	let new_category;
	if (!category) {
		new_category = new Category({
			name: category_name,
			categoryOf: "quotes",
		});
		await new_category.save();
	}

	let language = await Language.findOne({
		name: language_name,
		languageOf: "quotes",
	});
	let new_language;
	if (!language) {
		new_language = new Language({
			name: language_name,
			languageOf: "quotes",
		});
		await new_language.save();
	}

	const quote = new Quote({
		title,
		quoteMeaning,
		quoteIncident,
		content,
		category: category ? category._id : new_category._id,
		language: language ? language._id : new_language._id,
		author,
	});
	await quote.save();

	res.status(200).json({
		alert: { type: "success", message: "Quote inserted successfully" },
		quote,
	});
});

export const updateQuote = catchAsyncError(async (req, res, next) => {
	const { id } = req.params;
	if (!id) {
		return next(
			new ErrorHandler("Quote id was not found in the params", 402)
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
		categoryOf: "quotes",
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
		languageOf: "quotes",
	});
	if (!language) {
		return next(
			new ErrorHandler(
				"Language don't exist. Create a new language first.",
				501
			)
		);
	}

	const editedQuote = await Quote.findByIdAndUpdate(
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
	if (!editedQuote) {
		return next(new ErrorHandler("Quote not found", 410));
	}

	res.status(200).json({
		alert: { type: "success", message: "Quote edited successfully" },
		editedQuote,
	});
});

export const deleteQuote = catchAsyncError(async (req, res, next) => {
	const { id } = req.params;
	if (!id) {
		return next(
			new ErrorHandler("Quote id was not found in the params", 402)
		);
	}

	const deletedQuote = await Quote.findByIdAndDelete(id);
	if (!deletedQuote) {
		return next(new ErrorHandler("Quote not found", 410));
	}

	res.status(200).json({
		alert: { type: "success", message: "Quote deleted successfully" },
	});
});

export const getQuoteByID = catchAsyncError(async (req, res, next) => {
	const { id } = req.params;
	if (!id) {
		return next(
			new ErrorHandler("Quote id was not found in the params", 402)
		);
	}

	let quote = await Quote.findById(id)
		.populate("category")
		.populate("language");

	if (!quote) {
		return next(new ErrorHandler("Quote not found", 410));
	}

	res.status(200).json({
		alert: { type: "success", message: "Quote fetched successfully" },
		quote,
	});
});

export const getAllQuotes = catchAsyncError(async (req, res, next) => {
	const quotes = await Quote.find().populate("category").populate("language");

	if (!quotes || quotes.length === 0) {
		return next(new ErrorHandler("No quotes exist", 410));
	}

	res.status(200).json({
		alert: {
			type: "success",
			message: "Fetched all the quotes successfully",
		},
		quotes,
	});
});

export const increaseViews = catchAsyncError(async (req, res, next) => {
	const { id } = req.params;
	if (!id) {
		return next(
			new ErrorHandler("Quote id was not found in the params", 402)
		);
	}

	let quote = await Quote.findById(id);
	if (!quote) {
		return next(new ErrorHandler("Quote not found", 410));
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
			new ErrorHandler("Quote id was not found in the params", 402)
		);
	}

	let quote = await Quote.findById(id);
	if (!quote) {
		return next(new ErrorHandler("Quote not found", 410));
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

export const getQuotesPast24 = catchAsyncError(async (req, res, next) => {
	const quotes = await Quote.find().populate("category").populate("language");

	if (!quotes || quotes.length === 0) {
		return next(new ErrorHandler("No quotes exist", 410));
	}

	const currentTime = Date.now();
	const filteredQuotes = quotes.filter((quote) => {
		return Math.round((currentTime - quote.postedOn) / 3600000) <= 24;
	});

	res.status(200).json({
		alert: {
			type: "success",
			message:
				"Fetched all the quotes uploaded in the last 24 hours successfully",
		},
		quotes: filteredQuotes,
	});
});

export const getFavourites = catchAsyncError(async (req, res, next) => {
	res.status(200).json({
		alert: {
			type: "success",
			message:
				"Fetched all the quotes uploaded in the last 24 hours successfully",
		},
	});
});
