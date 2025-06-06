import express from 'express';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
const port = 3000;

app.use(cors({
    origin: 'http://localhost:4200', // your Angular app URL
}));

app.use(express.json());

const genAI = new GoogleGenAI({ apiKey: process.env.GENAI_API_KEY});

app.post('/chat', async (req, res) => {
    const { message, history} = req.body;
const chat = genAI.chats.create({
    model: 'gemini-2.0-flash',
    config: {
        systemInstruction: "Do not use asterisks or bold characters. You are a chatbot that helps users with their essays to make them strong candidates for whatever they're applying to. Give them tips on how to make their essay stronger and what to include and exclude. Do not use asterisks. please use 2 break lines instead of 1 wherever necessary to improve readability. Now you're chatting with them: ",
    },
    history: history,
});

try {
    const response = await chat.sendMessage({message: message});
    res.json({ reply: response.text });
} catch (error) {
    console.error(error);
    res.json({ reply: 'Error occurred' });
}
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
