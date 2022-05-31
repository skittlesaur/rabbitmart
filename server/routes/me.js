import express from "express";
import auth from "../middleware/auth.js";
import {updateWishlist} from "../controller/me/Me.js";

const router = express.Router();

router.patch('/wishlist', auth, updateWishlist);

export default router;