import express from "express";
import {postShipments, updateShipments, getShipmentId} from "../controller/shipping/shipping.js";


const router = express.Router();
router.post('/', postShipments);
router.get('/:id', getShipmentId);
router.patch('/', updateShipments);


export default router;