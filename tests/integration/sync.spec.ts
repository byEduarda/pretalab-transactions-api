import request from 'supertest';
import app from '../../src/app';
import { connectToMongo, disconnectFromMongo, dropDatabase } from '../../tests/jest.setup';
import ProductModel from '../../src/database/mongooseProduct';
import axios from 'axios';

jest.mock('axios');

describe('Integração da Rota de Sincronização', () => {
  beforeAll(async () => {
    await connectToMongo();
  });

  afterEach(async () => {
    await dropDatabase();
  });

  afterAll(async () => {
    await disconnectFromMongo();
  });

  it('POST /api/sync-products deve sincronizar produtos e retornar uma mensagem de sucesso', async () => {
    const mockExternalProducts = [{ name: 'Produto A', price: 50 }];
    (axios.get as jest.Mock).mockResolvedValue({ data: mockExternalProducts });

    const response = await request(app).post('/api/sync-products');

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Sincronização de produtos iniciada com sucesso!');

    const productsInDb = await ProductModel.find({});
    expect(productsInDb).toHaveLength(1);
    expect(productsInDb[0]).toMatchObject({ name: 'Produto A', price: 50 });
  });
});