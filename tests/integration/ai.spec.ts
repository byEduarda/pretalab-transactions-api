import { generateResponse } from "../../src/services/aiService";
import dotenv from "dotenv"
dotenv.config();

if (!process.env.GEMINI_API_KEY) {
  throw new Error("A variável de ambiente GEMINI_API_KEY não está definida.");
}

jest.mock("../../src/services/geminiClient", () => ({
  gemini: {
    generateContent: jest.fn().mockResolvedValue("Resposta simulada da IA")
  }
}));

describe("Testes de Unidade do Serviço de IA", () => {
  it("deve gerar uma resposta da IA", async () => {
    const response = await generateResponse("Qual é a capital do Brasil?");
    expect(response).toBe("Resposta simulada da IA");
  });

  it("deve retornar erro se a mensagem estiver vazia", async () => {
    await expect(generateResponse("")).rejects.toThrow();
  });
});