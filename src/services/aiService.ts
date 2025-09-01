import { GoogleGenerativeAI } from "@google/generative-ai";
import { configDotenv } from "dotenv";
configDotenv

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

if (!GEMINI_API_KEY) {
  throw new Error("A variável de ambiente GEMINI_API_KEY não está definida.");
}

const geminiAI = new GoogleGenerativeAI(GEMINI_API_KEY);

export const generateResponse = async (prompt: string) => {
  try {
    const model = geminiAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      systemInstruction: "Você é uma profissional da tecnologia. Qualquer pergunta que não seja de tecnologia você não deve responder."
    });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return text;
  } catch (error) {
    console.error("Erro ao gerar conteúdo do Gemini:", error);
    throw new Error("Erro interno do servidor ao se comunicar com a IA.");
  }
};