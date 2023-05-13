import express from "express";
import {
	AdminAuthenticate,
	Authenticate,
} from "../middlewares/authenticate.js";
import {
	deleteQuote,
	getAllQuotes,
	getQuoteByID,
	getQuotesPast24,
	increaseLikes,
	increaseViews,
	insertQuote,
	updateQuote,
} from "../controllers/quoteController.js";
const router = express.Router();

router.route("/").get(Authenticate, getAllQuotes);
router.route("/latest").get(Authenticate, getQuotesPast24);

// CRUD FOR ONE QUOTE
router
	.route("/:id")
	.get(Authenticate, getQuoteByID)
	.put(Authenticate, AdminAuthenticate, updateQuote)
	.delete(Authenticate, AdminAuthenticate, deleteQuote);

//views
router.route("/:id/views").post(Authenticate, increaseViews);

//likes
router.route("/:id/likes").post(Authenticate, increaseLikes);

//router.route("/favourites").get(Authenticate, getFavourites);

//INSERT QUOTE: As of now you should be an admin to add a quote in the database
router.route("/insert").post(Authenticate, AdminAuthenticate, insertQuote);

export default router;
