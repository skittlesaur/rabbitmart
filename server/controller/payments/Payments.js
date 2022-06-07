import {stripe} from "../../index.js";
import axios from "axios";
import jwt from "jsonwebtoken";
import generateId from "../../utils/generateId.js";
import {ORDERS_BASEURL, WEBSITE_BASE_URL} from "../../services/BaseURLs.js";

export const createCheckoutSession = async (req, res) => {
    try {
        const {products, total} = jwt.verify(
            req.body.token,
            process.env.JWT_SECRET_KEY
        );
        const {data} = req.body;
        const order_id = generateId();

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "payment",
            line_items: products.map((product) => {
                return {
                    price_data: {
                        currency: "egp",
                        product_data: {
                            name: product.name,
                        },
                        unit_amount: parseInt(product.price * 100),
                    },
                    quantity: product.quantity || 1,
                };
            }),
            payment_intent_data: {
                metadata: {
                    order_id: order_id,
                    firstName: data.name.first,
                    lastName: data.name.last,
                    email: data.email,
                    phone_number: data.phone_number,
                    address: JSON.stringify({
                        country: data.address.country,
                        city: data.address.city,
                        area: data.address.area,
                        street: data.address.street,
                        building_number: data.address.building_number,
                        floor: data.floor,
                        apartment_number: data.address.apartment_number,
                    }),
                    products: JSON.stringify(
                        products.map((product) => {
                            return {
                                product_id: product.product_id,
                                name: product.name,
                                quantity: product.quantity,
                            };
                        })
                    ),
                    total: total,
                },
            },
            success_url: `${WEBSITE_BASE_URL}/checkout/success?order=${order_id}`,
            cancel_url: `${WEBSITE_BASE_URL}/cart`,
        });

        res.status(201).json({url: session.url});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

export const webhook = async (req, res) => {
    const eventType = req.body.type;
    const {metadata} = req.body.data.object;
    try {
        if (eventType === "charge.succeeded") {
            await axios.post(ORDERS_BASEURL, {data: metadata});
        }
        res.status(200).json(metadata);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
};
