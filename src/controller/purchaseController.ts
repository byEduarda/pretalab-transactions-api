import { Request, Response } from 'express';
import * as purchaseService from '../services/purchaseService';

export const checkout = async (req: Request, res: Response) => {
  try {
    const { cart, total } = req.body;

    if (total > 20000) {
      return res.status(400).json({ message: 'O valor total da compra excede o limite de R$20.000.' });
    }

    const savedPurchase = await purchaseService.createPurchase(cart, total);

    res.status(201).json(savedPurchase);
  } catch (error) {
    console.error('Erro:', error);
    res.status(500).json({ message: 'Erro ao processar a compra.' });
  }
};

export const getPurchases = async (req: Request, res: Response) => {
  try {
    const purchases = await purchaseService.getAllPurchases();
    res.status(200).json(purchases);
  } catch (error) {
    console.error('Erro:', error);
    res.status(500).json({ message: 'Erro ao buscar histórico de compras.' });
  }
};

export const getPurchaseById = async (req: Request, res: Response) => {
  try {
    const purchase = await purchaseService.getPurchaseById(req.params.id);
    if (!purchase) {
      return res.status(404).json({ message: 'Compra não encontrada.' });
    }
    res.status(200).json(purchase);
  } catch (error) {
    console.error('Erro:', error);
    res.status(500).json({ message: 'Erro ao buscar a compra.' });
  }
};