import express from "express";
import {
	AdminAuthenticate,
	Authenticate,
} from "../middlewares/authenticate.js";
import {
	getAllStories,
	getStoriesPast24,
	insertStory,
} from "../controllers/storyController.js";
const router = express.Router();

router.route("/").get(Authenticate, getAllStories);
router.route("/latest").get(Authenticate, getStoriesPast24);

// CRUD FOR ONE Story
// routerinsert
// 	.route("/:id")
// 	.get(Authenticate, getStoryByID)
// 	.put(Authenticate, AdminAuthenticate, updateStory)
// 	.delete(Authenticate, AdminAuthenticate, deleteStory);

// //views
// router.route("/:id/views").post(Authenticate, increaseViews);

// //likes
// router.route("/:id/likes").post(Authenticate, increaseLikes);

// //router.route("/favourites").get(Authenticate, getFavourites);

// //INSERT Story: As of now you should be an admin to add a story in the database
router.route("/insert").post(Authenticate, AdminAuthenticate, insertStory);

export default router;
