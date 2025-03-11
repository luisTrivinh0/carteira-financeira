export interface Transaction {
    id: string;
    senderId: string;
    receiverId: string;
    amount: number;
    status: "PENDING" | "COMPLETED" | "FAILED";
    createdAt: Date;
    reversedTransactionId: string;
}
