import axios from 'axios';
import { syncProducts } from '../../src/externalAPI/finshoppingService';
import ProductModel from '../../src/database/mongooseProduct';

jest.mock('axios');
jest.mock('../../src/database/mongooseProduct');

describe('Testes de Unidade do Serviço de Finshopping', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('deve sincronizar e salvar produtos da API externa', async () => {
    const mockExternalProducts = [{ name: 'Produto A', price: 50 }];
    (axios.get as jest.Mock).mockResolvedValue({ data: mockExternalProducts });
    (ProductModel.deleteMany as jest.Mock).mockResolvedValue({});
    (ProductModel.insertMany as jest.Mock).mockResolvedValue({});

    await syncProducts();

    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(ProductModel.deleteMany).toHaveBeenCalledTimes(1);
    expect(ProductModel.insertMany).toHaveBeenCalledWith([
      expect.objectContaining({ name: 'Produto A', price: 50 })
    ]);
  });
});