import express from "express";
import {
	deletePoem,
	getAllPoems,
	getPoemByID,
	getPoemsPast24,
	increaseViews,
	increaseLikes,
	insertPoem,
	updatePoem,
	getFavourites,
} from "../controllers/poemController.js";
import {
	AdminAuthenticate,
	Authenticate,
} from "../middlewares/authenticate.js";
const router = express.Router();

router.route("/").get(Authenticate, getAllPoems);
router.route("/latest").get(Authenticate, getPoemsPast24);

// CRUD FOR ONE POEM
router
	.route("/:id")
	.get(Authenticate, getPoemByID)
	.put(Authenticate, AdminAuthenticate, updatePoem)
	.delete(Authenticate, AdminAuthenticate, deletePoem);

// views
router.route("/:id/views").post(Authenticate, increaseViews);

// likes
router.route("/:id/likes").post(Authenticate, increaseLikes);

router.route("/favourites").get(Authenticate, getFavourites);

// INSERT POEM: As of now you should be an admin to add a poem in the database
router.route("/insert").post(Authenticate, AdminAuthenticate, insertPoem);

export default router;
