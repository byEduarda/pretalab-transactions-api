import request from "supertest";
import app from "../../src/app";
import { transactions } from "../../src/models/data";

describe("Testes de Integração — Transações", () => {
  it("deve retornar 200 e a transação ao buscar por ID existente", async () => {
    const transacaoExistente = transactions[0]; 

    const resposta = await request(app).get(`/transactions/${transacaoExistente.id}`);

    expect(resposta.status).toBe(200);
    expect(resposta.body.transaction.id).toBe(transacaoExistente.id);
    expect(resposta.body.transaction.amount).toBe(transacaoExistente.amount);
    expect(resposta.body.transaction.type).toBe(transacaoExistente.type);
  });

  it("deve retornar 404 ao buscar transação inexistente", async () => {
    const resposta = await request(app).get("/transactions/999");

    expect(resposta.status).toBe(404);
    expect(resposta.body.message).toBe("Transação não encontrada");
  });
});
