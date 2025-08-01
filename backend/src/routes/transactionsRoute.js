import express, { Router } from "express";
import {createTransaction, deleteTransaction, getSummaryByUserId, getTransactionsByUserId} from "../controllers/transactionsControllers.js"

const router = express.Router()

router.get("/summary/:userId", getSummaryByUserId);
router.get("/:userId", getTransactionsByUserId);
router.post("/", createTransaction);
router.delete("/:id", deleteTransaction);

export default router;