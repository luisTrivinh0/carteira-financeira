import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const transfer = async (senderId: string, receiverId: string, amount: number) => {
    return await prisma.$transaction(async (tx) => {
        const sender = await tx.user.findUnique({ where: { id: senderId } });
        const receiver = await tx.user.findUnique({ where: { id: receiverId } });

        if (!sender || !receiver) throw new Error("Usuário não encontrado");
        if (sender.balance < amount) throw new Error("Saldo insuficiente");

        await tx.user.update({
            where: { id: senderId },
            data: { balance: { decrement: amount } },
        });

        await tx.user.update({
            where: { id: receiverId },
            data: { balance: { increment: amount } },
        });

        return await tx.transaction.create({
            data: { senderId, receiverId, amount, status: "COMPLETED" },
        });
    });
};

export const getTransactions = async (userId: string) => {
    return await prisma.transaction.findMany({
        where: { OR: [{ senderId: userId }, { receiverId: userId }] },
        orderBy: { createdAt: "desc" },
    });
};

export const getBalance = async (userId: string) => {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new Error("Usuário não encontrado");
    return { balance: user.balance };
};

export const refundTransaction = async (transactionId: string) => {
    return await prisma.$transaction(async (tx) => {
        const transaction = await tx.transaction.findUnique({
            where: { id: transactionId },
        });

        if (!transaction) throw new Error("Transação não encontrada");
        if (transaction.reversedTransactionId) throw new Error("Essa transação já foi reembolsada");

        const sender = await tx.user.findUnique({ where: { id: transaction.senderId } });
        const receiver = await tx.user.findUnique({ where: { id: transaction.receiverId } });

        if (!sender || !receiver) throw new Error("Usuário não encontrado");
        
        const refund = await tx.transaction.create({
            data: {
                senderId: transaction.receiverId,
                receiverId: transaction.senderId,
                amount: transaction.amount,
                status: "REFUNDED",
            },
        });

        await tx.transaction.update({
            where: { id: transactionId },
            data: { reversedTransactionId: refund.id },
        });

        await tx.user.update({
            where: { id: transaction.receiverId },
            data: { balance: { decrement: transaction.amount } },
        });

        await tx.user.update({
            where: { id: transaction.senderId },
            data: { balance: { increment: transaction.amount } },
        });

        return refund;
    });
};