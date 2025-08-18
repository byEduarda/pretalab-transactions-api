import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
dotenv.config();

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

export const generateText = async (prompt: string) => 
    ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
    });

export const chat = async (prompt: string) => 
    ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: [
            {
                role: "user",
                parts: [{ text: prompt }]
            }
        ],
        config: {
            responseMimeType: "application/json",
            systemInstruction:
                "Você é uma profissional da tecnologia. Qualquer pergunta que não seja de tecnologia você não deve responder"
        }
    });

