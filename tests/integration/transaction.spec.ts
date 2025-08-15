import request from "supertest";
import app from "../../src/index";

describe("Testes de Integração — Transações", () => {
  it("deve retornar 200 e a transação ao buscar por ID existente", async () => {
    const idFalso = "123";

    await request(app)
      .post("/transacoes")
      .send({ id: idFalso, valor: 500, tipo: "entrada" });

    const resposta = await request(app).get(`/transacoes/${idFalso}`);

    expect(resposta.status).toBe(200);
    expect(resposta.body.id).toBe(idFalso);
  });

  it("deve retornar 404 ao buscar transação inexistente", async () => {
    const resposta = await request(app).get("/transacoes/999");

    expect(resposta.status).toBe(404);
  });
});
