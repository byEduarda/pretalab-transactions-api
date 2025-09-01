import request from 'supertest';
import app from '../../src/app';
import { connectToMongo, disconnectFromMongo, dropDatabase } from '../../tests/jest.setup';
import ProductModel from '../../src/database/mongooseProduct';

describe('Integração das Rotas de Produtos', () => {
  beforeAll(async () => {
    await connectToMongo();
  });

  afterEach(async () => {
    await dropDatabase();
  });

  afterAll(async () => {
    await disconnectFromMongo();
  });

  it('GET /api/products deve retornar todos os produtos', async () => {
    await ProductModel.create([{ name: 'Mouse', price: 50 }, { name: 'Teclado', price: 100 }]);

    const response = await request(app).get('/api/products');

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(2);
    expect(response.body).toEqual(expect.arrayContaining([
      expect.objectContaining({ name: 'Mouse', price: 50 }),
      expect.objectContaining({ name: 'Teclado', price: 100 }),
    ]));
  });

  it('GET /api/products/:id deve retornar um produto', async () => {
    const product = await ProductModel.create({ name: 'Monitor', price: 800 });
    const response = await request(app).get(`/api/products/${product._id}`);

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({ name: 'Monitor', price: 800 });
  });
});