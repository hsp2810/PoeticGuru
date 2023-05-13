import express from "express";
import {
	authenticate,
	login,
	logout,
	register,
} from "../controllers/authController.js";
import { Authenticate } from "../middlewares/authenticate.js";
const router = express.Router();

router.route("/login").post(login);
router.route("/authenticate").get(Authenticate, authenticate);
router.route("/register").post(register);
router.route("/logout").get(logout);

export default router;
