import express from "express";
import {postShipments, updateShipments, getShipmentId, getShipments} from "../controller/shipping/Shipping.js";
import auth from "../middleware/auth.js";


const router = express.Router();
router.post('/', postShipments);
router.get('/:id', getShipmentId);
router.get('/', auth, getShipments);
router.patch('/:id', auth, updateShipments);


export default router;