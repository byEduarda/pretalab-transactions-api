import request from 'supertest';
import app from '../../src/app';
import { connectToMongo, disconnectFromMongo, dropDatabase } from '../../tests/jest.setup';
import PurchaseModel from '../../src/database/mongoosePurchases';

describe('Integração das Rotas de Compras', () => {
  beforeAll(async () => {
    await connectToMongo();
  });

  afterEach(async () => {
    await dropDatabase();
  });

  afterAll(async () => {
    await disconnectFromMongo();
  });

  it('POST /api/checkout deve criar uma nova compra', async () => {
    const cart = [{ productId: '1', quantity: 1, name: 'Produto', price: 100 }];
    const total = 100;
    const response = await request(app)
      .post('/api/checkout')
      .send({ cart, total });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('_id');
    expect(response.body).toMatchObject({ total: 100 });
    expect(response.body.items[0]).toMatchObject({ name: 'Produto' });
  });

  it('POST /api/checkout deve retornar 400 se o total exceder o limite', async () => {
    const total = 20001;
    const response = await request(app)
      .post('/api/checkout')
      .send({ cart: [], total });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('O valor total da compra excede o limite de R$20.000.');
  });
});