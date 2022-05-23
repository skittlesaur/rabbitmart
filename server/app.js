import express from "express";
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import products from "./routes/products.js";
import auth from "./routes/auth.js";

import orderRoutes from './routes/orders.js';

const app = express();
dotenv.config();

app.use(bodyParser.json({extended: true}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

app.use('/orders', orderRoutes);
app.use('/products', products);
app.use('/auth', auth);

app.get('/', (req, res) => {
    res.status(200).json({
        team_name: "Curious Monkeys",
        dev_team: ["Baraa A.", "Eman S.", "Sary N.", "Youssef S."].sort()
    })
});

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => app.listen(PORT, () => console.log("Server listening on port " + PORT)))
.catch((error) => console.log(error.message));
