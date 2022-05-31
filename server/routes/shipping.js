import express from "express";
import {postshipments,updateshipments,getshipments} from "../controller/shipping.js/shipping.js";


const router = express.Router();
router.post('/',postshipments );
router.get('/',getshipments );
router.patch('/',updateshipments);


export default router;