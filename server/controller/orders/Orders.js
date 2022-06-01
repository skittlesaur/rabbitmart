import axios from "axios";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import Order from "../../model/Orders.js";
import Users from "../../model/Users.js";
import Pagination from "../../utils/pagination.js";
import generateId from "../../utils/generateId.js";

export const createOrder = async (req, res) => {
    try {
        const { products, total } = jwt.verify(req.body.token, process.env.JWT_SECRET_KEY);
        const { data } = req.body;

        const paymentStatus = await axios.post("http://localhost:5000/payments", { products, total, data });

       /* const { data } = req.body;
        const order = new Order({
            order_id: generateId(),
            name: data.name,
            email: data.email,
            phone_number: data.phone_number,
            address: data.address,
            ordered_at: Date.now(),
            products: products.map( product => {
                return { 
                    product_id: product.product_id,
                    name: product.name,
                    quantity: product.quantity
                }
            }),
            total: total
        });

        await order.save();

        //const updateQuantity = await axios.patch("" , { products });

        //const createShipment = await axios.post("" , { newOrder });
        
        const to = "youssef.elbasha.saad@gmail.com"; //order.email;
        const notification = await axios.post("http://localhost:5000/notifications/order-confirmation", { to, order }); */

    res.status(200).json({  message: "order id" /* order_id: order.order_id */ });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const finalizeOrder = async () => {
    console.log("finally!!");
}

export const getOrder = async (req, res) => {
    try {
        const requiredOrder = await Order.findOne({"order_id": req.params.id});

        if (!requiredOrder) {
            return res.status(404).json({message: "Order does not exist"});
        }

        res.status(200).json(requiredOrder);

    } catch (error) {
        res.status(404).json({message: error.message});

    }
}

export const getAllOrders = async (req, res) => {
    try {

        const id = req.body.id;
        const user = await Users.findById(id, {password: 0});

        if (!user) {
            return res.status(404).json({message: "User does not exist "});
        }

        if (user.role !== 'ADMIN') {
            return res.status(401).json({message: "Unauthorized user"});
        }

        const orders = await Order.find().sort({ordered_at: -1});
        const ordersPaged = Pagination(req.query.page, orders);

        const total_pages = Math.ceil(await Order.count() / 20);

        res.status(200).json({total_pages, orders: ordersPaged});

    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

export const updateOrder = async (req, res) => {
    try {

        const orderStatus = req.body.status;
        const id = req.body.id;

        const user = await Users.findById(id, {password: 0});

        if (!user) {
            return res.status(404).json({message: "User does not exist "});
        }

        if (user.role !== "ADMIN") {
            return res.status(401).json({message: "Unauthorized user"});
        }


        if (!['CREATED', 'PROCESSING', 'FULFILLED', 'CANCELLED'].includes(orderStatus)) {
            return res.status(400).json({message: "Invalid status, has to be CREATED, PROCESSING, FULFILLED, CANCELLED"});
        }

        const updatedOrder = await Order.findOneAndUpdate({"order_id": req.params.id}, {
            status: orderStatus,
        });

        if (!updatedOrder) {
            return res.status(404).json({message: "Order does not exist"});
        }

        res.status(200).json(updatedOrder);

    } catch (error) {
        res.status(404).json({message: error.message});
    }
}