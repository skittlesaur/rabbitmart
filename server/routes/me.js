import express from "express";
import auth from "../middleware/auth.js";
import {getWishlist, updateWishlist} from "../controller/me/Me.js";

const router = express.Router();

router.get('/wishlist', auth, getWishlist);
router.patch('/wishlist', auth, updateWishlist);

export default router;