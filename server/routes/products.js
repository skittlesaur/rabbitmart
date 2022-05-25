import express from "express";

import {
    PostProducts,
    ShowProductsPerPage,
    productsSearch,
    validateCart,
    adminUpdateProducts, ProductsRecommendations
} from '../controller/products/Products.js';
import auth from "../middleware/auth.js";

const router = express.Router();

router.get('/', ShowProductsPerPage);
router.post('/', PostProducts);
router.patch('/', auth, adminUpdateProducts);
router.get('/recommendations', ProductsRecommendations);
router.get('/search', productsSearch);
router.post('/cart', validateCart);

export default router;