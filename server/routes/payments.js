import express from "express";
import { handlePayment, webhook } from "../controller/payments/Payments.js";

const router = express.Router();

router.post('/', handlePayment);
router.post('/webhook', webhook);

export default router;