import { Request, Response } from "express";
import * as purchaseController from "../../src/controller/purchaseController";
import * as purchaseService from "../../src/services/purchaseService";

jest.mock("../../src/services/purchaseService");

describe("Purchase Controller Unit Tests", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let statusMock: jest.Mock;
  let jsonMock: jest.Mock;

  beforeEach(() => {
    statusMock = jest.fn().mockReturnThis();
    jsonMock = jest.fn();
    res = { status: statusMock, json: jsonMock };
    req = {};
    jest.clearAllMocks();
  });

  it("getAllPurchases deve retornar todas as compras", () => {
    const fakePurchases = [{ id: "1", total: 100 }];
    (purchaseService.getAllPurchases as jest.Mock).mockReturnValue(fakePurchases);

    purchaseController.getAllPurchases(req as Request, res as Response);

    expect({ status: statusMock.mock.calls[0][0], json: jsonMock.mock.calls[0][0] })
      .toMatchObject({ status: 200, json: { purchases: fakePurchases } });
  });

  it("getPurchaseById deve retornar a compra quando encontrada", () => {
    const fakePurchase = { id: "1", total: 100 };
    req.params = { id: "1" };
    (purchaseService.getPurchaseById as jest.Mock).mockReturnValue(fakePurchase);

    purchaseController.getPurchaseById(req as Request, res as Response);

    expect({ status: statusMock.mock.calls[0][0], json: jsonMock.mock.calls[0][0] })
      .toMatchObject({ status: 200, json: { purchase: fakePurchase } });
  });

  it("getPurchaseById deve retornar 404 quando compra não encontrada", () => {
    req.params = { id: "999" };
    (purchaseService.getPurchaseById as jest.Mock).mockReturnValue(undefined);

    purchaseController.getPurchaseById(req as Request, res as Response);

    expect({ status: statusMock.mock.calls[0][0], json: jsonMock.mock.calls[0][0] })
      .toMatchObject({ status: 404, json: { message: "Compra não encontrada" } });
  });
});
