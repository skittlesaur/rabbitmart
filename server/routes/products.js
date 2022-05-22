import express from "express";
import {updateProducts, validateCart} from "../controller/products/Products.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post('/cart', validateCart);
router.post('/update', auth, updateProducts)

export default router;