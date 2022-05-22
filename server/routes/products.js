import express from "express";
import { PostProducts, ShowProductsPerPage, productsSearch } from '../controller/products/Products.js';

const router = express.Router();

//router.METHOD(PATH, CONTROLLER_FUNCTION)
//METHOD = GET,POST,PATCH,DELETE
//PATH = String starting with /
//CONTROLLER_FUNCTION = reference to the function that handles the logic for this specific route

router.get('/search', productsSearch);
router.get('/',ShowProductsPerPage);
router.post('/',PostProducts);
export default router;