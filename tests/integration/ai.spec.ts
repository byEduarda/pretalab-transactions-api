import request from "supertest";
import app from "../../src/app";

jest.mock("../../src/services/aiService", () => ({
  gemini: {
    generateContent: jest.fn().mockResolvedValue("Resposta simulada da IA")
  }
}));

describe("AI API", () => {
  it("deve gerar conteúdo usando Gemini", async () => {
    const res = await request(app).post("/api/ai/generate").send({ prompt: "Teste" });
    expect(res.status).toBe(200);
    expect(res.body.content).toBe("Resposta simulada da IA");
  });
});
