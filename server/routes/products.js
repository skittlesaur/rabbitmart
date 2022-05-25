import express from "express";

import { PostProducts, ShowProductsPerPage, productsSearch, validateCart } from '../controller/products/Products.js';

const router = express.Router();

router.get('/',ShowProductsPerPage);
router.post('/',PostProducts);
router.get('/search', productsSearch);
router.post('/cart', validateCart);

export default router;