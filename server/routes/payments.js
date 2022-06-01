import express from "express";
import { handlePayment } from "../controller/payments/Payments.js";

const router = express.Router();

router.post('/', handlePayment);

export default router;