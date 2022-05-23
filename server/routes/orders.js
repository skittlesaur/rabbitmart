import express from "express";

import { createOrder, getOrder, updateOrder } from "../controller/orders/Orders.js";

const router = express.Router();

router.post('/', createOrder);
router.get('/:id', getOrder);
router.patch('/:id', updateOrder);

export default router;