-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "reversedTransactionId" TEXT,
ALTER COLUMN "status" SET DEFAULT 'COMPLETED';
