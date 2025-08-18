import request from "supertest";
import app from "../../src/index";

describe("Testes de Integração — Transações", () => {
  let idFalso: string;

  beforeEach(() => {
    idFalso = Math.random().toString(36).substring(2, 10);
  });

  it("deve retornar 200 e a transação ao buscar por ID existente", async () => {
    await request(app)
      .post("/transactions")
      .send({
        id: idFalso,
        date: new Date().toISOString(),
        description: "Teste",
        amount: 500,
        type: "income",
        category: "Outros",
      });

    const resposta = await request(app).get(`/transactions/${idFalso}`);

    expect(resposta.status).toBe(200);
    expect(resposta.body.id).toBe(idFalso);
  });

  it("deve retornar 404 ao buscar transação inexistente", async () => {
    const resposta = await request(app).get("/transactions/999999");

    expect(resposta.status).toBe(404);
  });
});
