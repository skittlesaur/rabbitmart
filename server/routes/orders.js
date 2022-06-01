import express from "express";

import { getOrder, getAllOrders, updateOrder } from "../controller/orders/Orders.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get('/:id', getOrder);
router.get('/', auth, getAllOrders);
router.patch('/:id', auth,  updateOrder);

export default router;
