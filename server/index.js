import express from "express";
import dotenv from "dotenv";
dotenv.config();
import { ErrorMiddleware } from "./middlewares/Error.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

const PORT = process.env.PORT;
const URI = process.env.URI;

// Pre-made Middlwares
app.use(express.json());
app.use(cookieParser());
app.use(
	cors({
		origin: "http://localhost:3000",
		credentials: true,
	})
);

app.get("/", (req, res) => {
	res.send("Atleast server is working fine.");
});

// Connect to the database
connectToDB(URI);

// Getting the routes
import auth from "./routes/authRoutes.js";
import user from "./routes/userRoutes.js";
import poem from "./routes/poemRoutes.js";
import quote from "./routes/quoteRoutes.js";
import story from "./routes/storyRoutes.js";
import { connectToDB } from "./config/db.js";

app.use("/api/v1/auth", auth);
app.use("/api/v1/users", user);
app.use("/api/v1/poems", poem);
app.use("/api/v1/quotes", quote);
app.use("/api/v1/stories", story);

app.listen(PORT, () => {
	console.log(`Server started on port ${PORT}`);
});

// Using the middlewares
app.use(ErrorMiddleware);

/*
app.use(ErrorMiddleware); If there are no parameters left in a route and the next gets called then this middlware will be called
*/
