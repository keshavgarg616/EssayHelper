import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import verifyToken from "./middleware.js";
import {
	chat,
	signUp,
	login,
	getHistory,
	getName,
	updateHistory,
	deleteHistory,
} from "./controller.js";

// Routes available at /chat, /signup, /login, /save-history, /get-history, /get-name
// /chat (message, history) -> { reply: "response text" }
// /signup (name, email, password) -> { success: true, message: "User created successfully" }
// /login (email, password) -> { success: true, message: "Login successful", user: { name, email, history } }
// /save-history (email, history) -> { message: "History updated" }
// /get-history (email) -> { history: [] }
// /get-name (email) -> { name: "user's name" }

dotenv.config();

const app = express();
const port = 3000;
const mongoURL = `mongodb+srv://${process.env.MongoDBUsername}:${process.env.MongoDBPswd}@${process.env.MongoDBClusterString}.mongodb.net/chatbot?retryWrites=true&w=majority&appName=Cluster0`;

app.use(cors({ origin: "http://localhost:4200" }));
app.use(express.json());
mongoose
	.connect(mongoURL)
	.then(() => console.log("Connected to MongoDB successfully"))
	.catch((err) => console.error("Error connecting to MongoDB:", err));

app.post("/signup", signUp);
app.post("/login", login);
app.post("/chat", verifyToken, chat);
app.post("/update-history", verifyToken, updateHistory);
app.post("/get-history", verifyToken, getHistory);
app.post("/get-name", verifyToken, getName);
app.post("/delete-history", verifyToken, deleteHistory);

app.listen(port, () => {
	console.log(`Server running at http://localhost:${port}`);
});
