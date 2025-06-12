import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import { User, Histories } from "./schema.js";
import jwt from "jsonwebtoken";

dotenv.config();
const genAI = new GoogleGenAI({ apiKey: process.env.GENAI_API_KEY });

export const chat = async (req, res) => {
	const { message, history } = req.body;
	const chat = genAI.chats.create({
		model: "gemini-2.0-flash",
		config: {
			systemInstruction: `Do not use asterisks or bold characters. 
        You are a chatbot that helps users with their essays to make them strong candidates 
        for whatever they're applying to. Give them tips on how to make their essay stronger 
        and what to include and exclude. Do not use asterisks. 
        Please use 2 break lines instead of 1 wherever necessary to improve readability. 
        Now you're chatting with them:`,
		},
		history: history,
	});

	try {
		const response = await chat.sendMessage({ message });
		res.json({ reply: response.text });
	} catch (error) {
		console.error("Chat error:", error);
		res.status(500).json({ reply: "Error occurred" });
	}
};

export const signUp = async (req, res) => {
	const { name, email, password } = req.body;

	try {
		const existingUser = await User.findByEmail(email);
		if (existingUser) {
			return res.status(409).json({ error: "User already exists" });
		}

		const newUser = new User({ name, email, password });
		const userHistory = new Histories({
			foreign_id: newUser._id,
			history: [],
		});
		await userHistory.save();
		await newUser.save();

		res.status(201).json({
			success: true,
			message: "User created successfully",
		});
	} catch (error) {
		console.error("Signup error:", error);
		res.status(500).json({ error: "Internal server error" });
	}
};

export const login = async (req, res) => {
	const { email, password } = req.body;
	try {
		const user = await User.findByEmail(email);
		if (user) {
			const isPasswordValid = await user.comparePassword(password);
			if (isPasswordValid) {
				const token = jwt.sign(
					{ userId: user._id },
					process.env.JWT_SECRET,
					{
						expiresIn: "1h",
					}
				);
				res.status(200).json({ token });
			} else {
				return res.status(401).json({ error: "Invalid password" });
			}
		} else {
			return res.status(404).json({ error: "User not found" });
		}
	} catch (error) {
		console.error("Login error:", error);
		res.status(500).json({ error: "Internal server error" });
	}
};

export const updateHistory = async (req, res) => {
	try {
		const { history } = req.body;
		const user = await Histories.findByUserId(req.userId);
		await user.updateHistory(history);
		res.status(201).json({ message: "History updated" });
	} catch (error) {
		console.error("History Updating error:", error);
		res.status(500).json({ error: "Internal server error" });
	}
};

export const getHistory = async (req, res) => {
	try {
		const user = await Histories.findByUserId(req.userId);
		res.json({ history: user.history || [] });
	} catch (error) {
		console.error("History get error:", error);
		res.status(500).json({ error: "Internal server error" });
	}
};

export const deleteHistory = async (req, res) => {
	try {
		const user = await Histories.findByUserId(req.userId);
		user.updateHistory([]);
		res.status(200).json({ message: "History deleted" });
	} catch (error) {
		console.error("History delete error:", error);
		res.status(500).json({ error: "Internal server error" });
	}
};

export const getName = async (req, res) => {
	try {
		const { email } = req.body;
		const user = await User.findByEmail(email);
		if (user) {
			res.json({ name: user.name });
		} else {
			res.status(404).json({ error: "User not found" });
		}
	} catch (error) {
		console.error("Get name error:", error);
		res.status(500).json({ error: "Internal server error" });
	}
};
