import * as productService from '../../src/services/productService';
import { products as mockProducts } from '../../src/models/productModel';
import MongooseProductModel from '../../src/database/mongooseProduct';

jest.mock('../../src/database/mongooseProduct');

describe('Serviço de Produtos - Testes de Unidade', () => {
  const mockFind = MongooseProductModel.find as jest.Mock;
  const mockFindById = MongooseProductModel.findById as jest.Mock;

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('deve retornar todos os produtos', async () => {
    mockFind.mockResolvedValue(mockProducts);

    const result = await productService.getAllProducts();

    expect(result).toEqual(mockProducts);
    expect(mockFind).toHaveBeenCalledTimes(1);
  });

  it('deve retornar um produto pelo ID', async () => {
    const mockProduct = mockProducts[0];
    mockFindById.mockResolvedValue(mockProduct);

    const result = await productService.getProductById('1');

    expect(result).toEqual(mockProduct);
    expect(mockFindById).toHaveBeenCalledWith('1');
  });
});
