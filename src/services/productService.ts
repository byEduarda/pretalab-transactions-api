import ProductModel from '../database/mongooseProduct';

export const getAllProducts = async () => {
  const products = await ProductModel.find({});
  return products;
};

export const getProductById = async (id: string) => {
  const product = await ProductModel.findById(id);
  return product;
};