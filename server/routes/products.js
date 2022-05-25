import express from "express";

import { PostProducts, ShowProductsPerPage, productsSearch, validateCart, ProductsRecommendations} from '../controller/products/Products.js';

const router = express.Router();

router.get('/search', productsSearch);
router.get('/',ShowProductsPerPage);
router.get('/recommendations',ProductsRecommendations);
router.post('/',PostProducts);
router.post('/cart', validateCart);

export default router;