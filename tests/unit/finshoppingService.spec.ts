import { getProducts } from "../../src/externalAPI/finshoppingService";


jest.mock('../../src/externalAPI/finshoppingService', () => ({
  getProducts: jest.fn().mockResolvedValue([
    { id: '1', name: 'Notebook Gamer Pro', price: 7500 },
    { id: '2', name: 'Mouse Sem Fio Ultra-leve', price: 350 },
    { id: '3', name: 'Teclado Mecânico RGB', price: 550 },
    { id: '4', name: 'Monitor 4K 27"', price: 2500 },
    { id: '5', name: 'Headset 7.1 Surround', price: 600 },
    { id: '6', name: 'Webcam Full HD', price: 400 },
    { id: '7', name: 'SSD NVMe 1TB', price: 800 }
  ]),
}));

describe("Testando API externa", () => {
  it("deve retornar produtos da API", async () => {
    const products = await getProducts();
    
    console.log("Produtos recebidos:", products);

    expect(products).toBeDefined();
    expect(Array.isArray(products)).toBe(true);
    expect(getProducts).toHaveBeenCalled();
    expect(products.length).toBe(7);
    expect(products[0]).toHaveProperty("name", "Notebook Gamer Pro");
  });
});