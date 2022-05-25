import express from "express";

import { getOrder, updateOrder } from "../controller/orders/Orders.js";

const router = express.Router();

router.get('/:id', getOrder);
router.patch('/:id', updateOrder);

export default router;
