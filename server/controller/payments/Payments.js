import { stripe } from "../../app.js";
import axios from "axios";
import generateId from "../../utils/generateId.js";

export const handlePayment = async (req, res) => {
    const { products, total, data } = req.body;
    const order_id =  generateId();
    //console.log(products, total, data);

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
            metadata: {
                order_id: order_id,
                firstname: data.first,
                lastname: data.last,
                email: data.email,
                phone_number: data.phone_number,
             /* address: {
                    country: data.country,
                    city: data.city,
                    area: data.area,
                    street: data.street,
                    building_number: data.building_number,
                    floor: data.floor,
                    apartment_number: data.apartment_number
                }, */
                total: total,
                
            },
            success_url: "http://localhost:3000",
            cancel_url:  "http://localhost:5000" 
        });
        
        console.log({ session });
        res.status(201).json({ url: session.url });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const webhook = async (req, res) => {
        const eventType = req.body.type;
        const body = req.body;
        const metadata = req.body.metadata;
        console.log(metadata);
  try {
    switch (eventType) {
        case 'checkout.session.completed':
            console.log(body);
            console.log(body.metadata);
            console.log("success!!!");
          break;
        case 'invoice.paid':
          break;
        case 'invoice.payment_failed':
          break;
        default:
        // Unhandled event type
      } 
    
      res.sendStatus(200);  
  } catch (error) {
      res.status(404).json({ message: error.message });
  }
    
  };
