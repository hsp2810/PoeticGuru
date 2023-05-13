import express from "express";
import {
	deleteAllUsers,
	deleteMe,
	deleteUser,
	getAllUsers,
	getMyProfile,
	getUserByID,
	updateMe,
	updateUser,
} from "../controllers/userController.js";
import { Authenticate } from "../middlewares/authenticate.js";
const router = express.Router();

// CRUD for all the users
router.route("/").get(getAllUsers).delete(deleteAllUsers);

// CRUD for logged in user
router
	.route("/me")
	.get(Authenticate, getMyProfile)
	.put(Authenticate, updateMe)
	.delete(Authenticate, deleteMe);

// CRUD for a single not logged in user: Update and Delete will go under Admin functionality
router
	.route("/:id")
	.get(Authenticate, getUserByID)
	.put(Authenticate, updateUser)
	.delete(Authenticate, deleteUser);

export default router;
