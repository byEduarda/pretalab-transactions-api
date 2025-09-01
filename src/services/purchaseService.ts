import PurchaseModel from '../database/mongoosePurchases';

export const createPurchase = async (cart: any[], total: number) => {
  const newPurchase = new PurchaseModel({
    date: new Date().toISOString(), 
    items: cart,
    total,
  });
  const savedPurchase = await newPurchase.save();
  return savedPurchase;
};

export const getAllPurchases = async () => {
  const purchases = await PurchaseModel.find({}).sort({ date: -1 });
  return purchases;
};

export const getPurchaseById = async (id: string) => {
  const purchase = await PurchaseModel.findById(id);
  return purchase;
};