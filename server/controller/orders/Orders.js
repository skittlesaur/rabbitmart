import Order from "../../model/Orders.js";

export const createOrder = async (req, res) => {

}

export const getOrder = async (req, res) => {
    try {
        const requiredOrder = await Order.findById(req.params.id); //has to search for order_id so probably use query, same for the rest

        res.status(200).json(requiredOrder);

    } catch (error) {
        res.status(404).json({ message: error.message });
        
    }
}

export const updateOrder = async (req, res) => {
    try {
        const requiredOrder = await Order.findById(req.params.id);

        // if (!requiredOrder) return res.status(404).json( { message: 'Order not found'}); // checks if order exists
        const status = req.body.status;

        const updatedOrder = await Order.findByIdAndUpdate(req.params.id, {
            orderStatus: status,
        })

        res.status(200).json(updatedOrder);

    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}