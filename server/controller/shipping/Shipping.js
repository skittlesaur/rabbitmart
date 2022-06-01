import Shipments from '../../model/shipments.js';
import Pagination from "../../utils/pagination.js";
import Users from "../../model/Users.js";

export const getShipmentId = async (req, res) => {
    const {id} = req.params;
    try {
        const your_shipment = await Shipments.findOne({"order_id": id});
        return res.status(200).json({
            order_id: your_shipment.order_id,
            total: your_shipment.total,
            address: your_shipment.address,
            status: your_shipment.shippment_status,
            ordered_at: your_shipment.ordered_at
        });
    } catch (e) {
        return res.status(400).json({message: e.message});
    }

}


export const updateShipments = async (req, res) => {
    try {
        const {status, order_id} = req.body;
        if (!status)
            return res.status(400).json({message: "Please provide the new status"});

        if (status !== 'CREATED' && status !== 'SHIPPED' && status !== 'DELIVERED' && status !== 'RETURNED')
            return res.status(400).json({message: "Please re-type the status correctly "});

        let shipmentResponse = await Shipments.findOneAndUpdate({order_id}, {status});

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
        const user = await Users.findById(id, {password: 0});

        if (!user) {
            return res.status(404).json({message: "User does not exist "});
        }

        if (user.role !== 'ADMIN') {
            return res.status(401).json({message: "Unauthorized user"});
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