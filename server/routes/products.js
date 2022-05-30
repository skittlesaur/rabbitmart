import express from "express";

import {
    PostProducts,
    ShowProductsPerPage,
    productsSearch,
    validateCart,
    adminUpdateProducts
} from '../controller/products/Products.js';
import auth from "../middleware/auth.js";

const router = express.Router();

router.get('/', ShowProductsPerPage);
router.post('/', auth, PostProducts);
router.patch('/', auth, adminUpdateProducts)
router.get('/search', productsSearch);
router.post('/cart', validateCart);

export default router;