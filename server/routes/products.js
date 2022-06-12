import express from "express";

import {
  PostProducts,
  ShowProductsPerPage,
  productsSearch,
  validateCart,
  adminUpdateProducts,
  ProductsRecommendations,
  getProductsArr,
  updateQuantity
} from "../controller/products/Products.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/", ShowProductsPerPage);
router.get("/recommendations", ProductsRecommendations);
router.post("/", auth, PostProducts);
router.patch("/", auth, adminUpdateProducts);
router.get("/search", productsSearch);
router.post("/cart", validateCart);
router.post("/arr", getProductsArr);
router.patch("/updateQuantity", updateQuantity);

export default router;
