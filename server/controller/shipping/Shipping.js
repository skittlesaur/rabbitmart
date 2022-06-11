import Shipments from '../../model/Shipments.js';
import Pagination from "../../utils/pagination.js";
import axios from "axios";
import {USER_BASEURL} from "../../services/BaseURLs.js";

export const getShipmentId = async (req, res) => {
    const {id} = req.params;
    try {
        const your_shipment = await Shipments.findOne({"order_id": id});

        if (!your_shipment)
            return res.status(400).json({message: 'Invalid order id'});

        return res.status(200).json({
            order_id: your_shipment.order_id,
            total: your_shipment.total,
            address: your_shipment.address,
            status: your_shipment.status,
            ordered_at: your_shipment.ordered_at
        });
    } catch (e) {
        return res.status(400).json({message: e.message});
    }

}


export const updateShipments = async (req, res) => {
    try {
        const {status, id} = req.body;

        // verify the user's role by calling the `User` service
        try {
            await axios.post(`${USER_BASEURL}/role`, {id, role: 'ADMIN'})
        } catch (e) {
            const {response} = e;
            return res.status(response.status).json(response.data);
        }

        if (!status)
            return res.status(400).json({message: "Please provide the new status"});

        if (status !== 'CREATED' && status !== 'SHIPPED' && status !== 'DELIVERED' && status !== 'RETURNED')
            return res.status(400).json({message: "Please re-type the status correctly "});

        const order_id = req.params.id;

        const shipmentResponse = await Shipments.findOneAndUpdate({order_id}, {status});

        return res.status(200).json(shipmentResponse);
    } catch (e) {
        return res.status(400).json({message: e.message});
    }
}

export const postShipments = async (req, res) => {
    const {ordered_at, order_id, address, total} = req.body;

    const newShippment = new Shipments({
        total: total,
        ordered_at: ordered_at,
        address: address,
        order_id: order_id
    });

    try {
        await newShippment.save();
        res.status(200).json(newShippment);
    } catch (e) {
        res.status(409).json({message: e.message});
    }
}

export const getShipments = async (req, res) => {
    try {
        const id = req.body.id;

        // verify the user's role by calling the `User` service
        try {
            await axios.post(`${USER_BASEURL}/role`, {id, role: 'ADMIN'})
        } catch (e) {
            const {response} = e;
            return res.status(response.status).json(response.data);
        }

        const {page} = req.query;

        const shipments = await Shipments.find().sort({ordered_at: -1});

        const total_pages = Math.ceil(shipments.length / 20);

        const pagedShipments = Pagination(page, shipments, 20);

        res.status(200).json({total_pages, shipments: pagedShipments});
    } catch (e) {
        res.status(400).json({message: e.message});
    }
}