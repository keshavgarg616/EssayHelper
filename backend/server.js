import express from "express";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import User from "./schema.js";

dotenv.config();

const app = express();
const port = 3000;

// Middleware
app.use(cors({ origin: "http://localhost:4200" }));
app.use(express.json());

// MongoDB connection
const mongoURL = `mongodb+srv://${process.env.MongoDBUsername}:${process.env.MongoDBPswd}@${process.env.MongoDBClusterString}.mongodb.net/chatbot?retryWrites=true&w=majority&appName=Cluster0`;
mongoose.connect(mongoURL)
    .then(() => console.log('Connected to MongoDB successfully'))
    .catch((err) => console.error('Error connecting to MongoDB:', err));

// Gemini API
const genAI = new GoogleGenAI({ apiKey: process.env.GENAI_API_KEY });


// Routes available at /chat, /signup, /login, and /history
// /chat (message, history) -> { reply: "response text" }
// /signup (name, email, password) -> { success: true, message: "User created successfully" }
// /login (email, password) -> { success: true, message: "Login successful", user: { name, email, history } }
// /history (email, history) -> { message: "History updated" }


// Takes a message and history from the request body and returns a response from the chatbot in the syntax of { reply: "response text" }.
app.post("/chat", async (req, res) => {
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
});

// Takes name, email, and password from the request body and returns a success message if the user is created successfully.
app.post("/signup", async (req, res) => {
    const { name, email, password } = req.body;
    console.log(req.body);

    if (!name || !email || !password) {
        return res.status(400).json({ error: "All fields are required" });
    }

    try {
        const existingUser = await User.findByEmail( email );
        if (existingUser) {
            return res.status(409).json({ error: "User already exists" });
        }

        const newUser = new User({ name, email, password });
        await newUser.save();

        res.status(201).json({
            success: true,
            message: "User created successfully",
        });
    } catch (error) {
        console.error("Signup error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Takes email and password from the request body and returns a user object if the login is successful in the syntax of 
// { success: true, message: "Login successful", user: { name, email, history } }.
app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findByEmail( email );
        if (user) {
            const isPasswordValid = await user.comparePassword(password);
            if (isPasswordValid) {
                res.status(200).json({
                    success: true,
                    message: "Login successful",
                    user: {
                        name: user.name,
                        email: user.email,
                        history: user.history,
                    },
                });
            } else {
                res.status(401).json({ error: "Invalid password" });
            }
        }
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Takes email and history from the request body and updates the user's history.
app.post("/save-history", async (req, res) => {
    try {
        const { email, history } = req.body;
        console.log("Updating history for email:", email, "with history:", history);
        const user = await User.findByEmail( email );
        console.log("User found:", user);
        await user.updateHistory(history);
        res.status(201).json({ message: "History updated" });
    } catch (error) {
        console.error("History Updating error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.post("/get-history", async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findByEmail( email );
        res.json({ history: user.history || [] });
    } catch (error) {
        console.error("History get error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
