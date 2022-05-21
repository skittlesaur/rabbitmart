import express from "express";
import {validateCart} from "../controller/products/Products.js";

const router = express.Router();

router.post('/cart', validateCart);

export default router;