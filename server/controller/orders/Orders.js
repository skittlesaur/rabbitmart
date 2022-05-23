import Order from "../../model/Orders.js";

export const getOrder = async (req, res) => {
    try {
        const requiredOrder = await Order.find({ "order_id": req.params.id });

        if(!requiredOrder.length){
            return res.status(404).json({ message: "Order does not exist" });
         }

        res.status(200).json(requiredOrder);

    } catch (error) {
        res.status(404).json({ message: error.message });
        
    }
}

export const updateOrder = async (req, res) => {
    try {

        const status = req.body.status;

        if(!['CREATED', 'PROCESSING', 'FULFILLED', 'CANCELLED'].includes(status)){
            return res.status(400).json({ message: "Invalid status, has to be CREATED, PROCESSING, FULFILLED, CANCELLED" });
        }

        const updatedOrder = await Order.findOneAndUpdate({ "order_id": req.params.id } , {
            orderStatus: status,
        });

        if(!updatedOrder){
           return res.status(404).json({ message: "Order does not exist" });
        }

        res.status(200).json(updatedOrder);

    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}