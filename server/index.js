import express from "express";
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import products from "./routes/products.js";
import shipping from "./routes/shipping.js"
import orders from './routes/orders.js';
import payments from './routes/payments.js';
import notifications from "./routes/notifications.js";
import sgMail from '@sendgrid/mail';
import me from "./routes/me.js";
import Stripe from "stripe";

const app = express();
dotenv.config();

sgMail.setApiKey(process.env.SENDGRID_KEY);
export const stripe = Stripe(process.env.STRIPE_PRIVATE_KEY);

app.use(bodyParser.json({extended: true}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

app.use('/orders', orders);
app.use('/payments', payments);
app.use('/products', products);
app.use('/shipping',shipping);
app.use('/notifications', notifications);
app.use('/me', me);

app.get('/', (req, res) => {
    res.status(200).json({
        team_name: "Curious Monkeys",
        dev_team: ["Baraa A.", "Eman S.", "Sary N.", "Youssef S."].sort()
    })
});

const PORT = process.env.PORT || 5000;

const mongooseOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

const handleServerStartup = () => {
    app.listen(PORT, () => console.log(`Server listening on port ${PORT}`))
}

mongoose.connect(process.env.CONNECTION_URL, mongooseOptions, handleServerStartup)

export default app