import Order from "../../model/Orders.js";

export const createOrder = async (req, res) => {

}

export const getOrder = async (req, res) => {
    try {
        const requiredOrder = await Order.find({ "order_id": req.params.id });

        res.status(200).json(requiredOrder);

    } catch (error) {
        res.status(404).json({ message: error.message });
        
    }
}

export const updateOrder = async (req, res) => {
    try {
        const requiredOrder = await Order.find({ "order_id": req.params.id });

        const status = req.body.status;

        const updatedOrder = await Order.findOneAndUpdate({ "order_id": req.params.id } , {
            orderStatus: status,
        })

        res.status(200).json(updatedOrder);

    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}