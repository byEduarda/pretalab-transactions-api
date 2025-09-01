import { Request, Response } from 'express';
import { generateResponse } from '../services/aiService'; 

export const chat = async (req: Request, res: Response) => {
    try {
        const { message } = req.body;
        
        if (!message) {
            return res.status(400).json({ error: "A chave 'message' é obrigatória no corpo da requisição." });
        }
        
        const reply = await generateResponse(message);
        
        res.status(200).json({ reply });
    } catch (error) {
        console.error("Erro no controller:", error);
        res.status(500).json({ message: "Ocorreu um erro ao processar sua solicitação." });
    }
};

export const aiResponse = async (req: Request, res: Response) => {
    try {
        const { prompt } = req.body;
        const response = await generateResponse(prompt);
        res.status(200).json({ response });
    } catch (error) {
        console.error("Erro no controller:", error);
        res.status(500).json({ message: "Ocorreu um erro ao processar sua solicitação." });
    }
};