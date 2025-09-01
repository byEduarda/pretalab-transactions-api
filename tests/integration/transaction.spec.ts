import request from 'supertest';
import app from '../../src/app';
import { connectToMongo, disconnectFromMongo, dropDatabase } from '../../tests/jest.setup';
import TransactionModel from '../../src/database/mongooseTransaction';

describe('Integração das Rotas de Transações', () => {
  beforeAll(async () => {
    await connectToMongo();
  });

  afterEach(async () => {
    await dropDatabase();
  });

  afterAll(async () => {
    await disconnectFromMongo();
  });

  it('deve criar uma nova transação', async () => {
    const newTransaction = {
      description: 'Conta de Luz',
      amount: 120.50,
      type: 'expense',
      category: 'Contas',
      date: '2025-01-10'
    };

    const response = await request(app)
      .post('/api/transactions')
      .send(newTransaction)
      .expect(201);

    expect(response.body).toHaveProperty('_id');
    expect(response.body).toMatchObject(newTransaction);
  });

  it('deve obter uma lista de transações', async () => {
    const transaction = await TransactionModel.create({
      description: 'Salario de Jan',
      amount: 5000,
      type: 'income',
      category: 'Salário',
      date: '2025-01-05'
    });

    const response = await request(app).get('/api/transactions').expect(200);

    expect(response.body).toBeInstanceOf(Array);
    expect(response.body).toHaveLength(1);
    expect(response.body[0]).toMatchObject({ description: 'Salario de Jan' });
  });
});