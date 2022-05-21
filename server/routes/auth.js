import express from "express";
import {login, verifyUser} from "../controller/auth/Authentication.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post('/login', login);
router.post('/verify', auth, verifyUser);

export default router;