import express from "express";
import auth from "../middleware/auth.js";
import {postWishlist} from "../controller/me/Me.js";

const router = express.Router();

router.patch('/wishlist', auth, postWishlist);

export default router;