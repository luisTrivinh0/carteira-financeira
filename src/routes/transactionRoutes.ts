import express from "express";
import { transferMoney, listTransactions, checkBalance, refundTransactionController } from "../controllers/transactionController";

const router = express.Router();

router.post("/transfer", transferMoney);
router.get("/:userId", listTransactions);
router.get("/:userId/balance", checkBalance);
router.post("/refund/:transactionId", refundTransactionController);

export default router;
