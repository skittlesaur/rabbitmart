import { stripe } from "../../app.js";

export const handlePayment = async (req, res) => {
    const { products } = req.body;

        try {        
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            line_items: products.map( product => {
                return {
                    price_data: {
                        currency: 'egp',
                        product_data: {
                            name: product.name
                        },
                        unit_amount: parseInt(product.price * 100)
                    },
                    quantity: product.quantity || 1
                }

            }),
            success_url: "http://localhost:5000",
            cancel_url:  "http://localhost:5000"
        });

        res.status(201).json({ url: session.url });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}