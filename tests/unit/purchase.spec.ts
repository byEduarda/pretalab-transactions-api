import * as purchaseService from '../../src/services/purchaseService';
import PurchaseModel from '../../src/database/mongoosePurchases';

jest.mock('../../../database/mongoosePurchase');

describe('Testes de Unidade do Serviço de Compras', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('deve criar uma nova compra', async () => {
    const mockPurchaseData = { cart: [], total: 100 };
    const mockSavedPurchase = { _id: 'mockId', ...mockPurchaseData };

    (PurchaseModel.prototype.save as jest.Mock).mockResolvedValue(mockSavedPurchase);

    const result = await purchaseService.createPurchase(mockPurchaseData.cart, mockPurchaseData.total);

    expect(result).toEqual(mockSavedPurchase);
    expect(PurchaseModel.prototype.save).toHaveBeenCalledTimes(1);
  });

  it('deve obter todas as compras ordenadas por data descendente', async () => {
    const mockPurchases = [{ total: 200, date: '2025-01-02' }, { total: 100, date: '2025-01-01' }];
    (PurchaseModel.find as jest.Mock).mockReturnValue({ sort: jest.fn().mockResolvedValue(mockPurchases) });

    const purchases = await purchaseService.getAllPurchases();

    expect(purchases).toEqual(mockPurchases);
    expect(PurchaseModel.find).toHaveBeenCalledTimes(1);
  });
});