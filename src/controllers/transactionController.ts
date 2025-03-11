import { Request, Response } from "express";
import { transfer, getTransactions, getBalance, refundTransaction } from "../services/transactionService";

export const transferMoney = async (req: Request, res: Response) => {
    try {
        const { senderId, receiverId, amount } = req.body;
        const transaction = await transfer(senderId, receiverId, amount);
        res.status(201).json(transaction);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const listTransactions = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const transactions = await getTransactions(userId);
        res.status(200).json(transactions);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const checkBalance = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const balance = await getBalance(userId);
        res.status(200).json(balance);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

// 🏦 Criar o endpoint de reembolso
export const refundTransactionController = async (req: Request, res: Response) => {
    try {
        const { transactionId } = req.params;
        const refund = await refundTransaction(transactionId);
        res.status(200).json(refund);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};
