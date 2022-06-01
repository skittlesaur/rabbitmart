import express from "express";
import {orderConfirmation} from "../controller/notifications/Notifications.js";

const router = express.Router();

router.post('/order-confirmation', orderConfirmation);

export default router;
