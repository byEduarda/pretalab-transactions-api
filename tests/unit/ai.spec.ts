import { generateResponse } from "../../src/services/aiService";

jest.mock("../../src/services/aiService", () => ({
  geminiClient: {
    generateContent: jest.fn().mockResolvedValue("Resposta simulada da IA")
  }
}));

describe("Testes de Unidade do Serviço de IA", () => {
  it("deve gerar uma resposta da IA", async () => {
    const prompt = "Teste IA";
    const response = await generateResponse(prompt);
    expect(response).toBe("Resposta simulada da IA");
  });
});
