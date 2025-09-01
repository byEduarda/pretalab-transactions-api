import * as productService from '../../src/services/productService';
import { products as mockProducts } from '../../src/models/productModel';
import MongooseProductModel from '../../src/database/mongooseProduct';

jest.mock('../../../database/mongooseProduct');

describe('Testes de Unidade do Serviço de Produtos', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('deve obter todos os produtos', async () => {
    (MongooseProductModel.find as jest.Mock).mockResolvedValue(mockProducts);

    const products = await productService.getAllProducts();

    expect(products).toEqual(mockProducts);
    expect(MongooseProductModel.find).toHaveBeenCalledTimes(1);
  });

  it('deve obter um produto por ID', async () => {
    const mockProduct = mockProducts[0];
    (MongooseProductModel.findById as jest.Mock).mockResolvedValue(mockProduct);

    const product = await productService.getProductById('1');

    expect(product).toEqual(mockProduct);
    expect(MongooseProductModel.findById).toHaveBeenCalledWith('1');
  });
});