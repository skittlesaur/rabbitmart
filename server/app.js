import express from "express";
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

const app = express();
dotenv.config();

app.use(bodyParser.json({extended: true}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());


app.get('/', (req, res) => {
    res.status(200).json({
        team_name: "Curious Monkeys",
        dev_team: ["Baraa A.", "Eman S.", "Sary N.", "Youssef S."].sort()
    })
});

const products = [
    {id: 1, name: 'c1'},
    {id: 2, name: 'c2'},
    {id: 3, name: 'c3'},
    {id: 4, name: 'c4'},
    {id: 5, name: 'c5'},
    {id: 6, name: 'c6'},
    {id: 7, name: 'c7'},
    {id: 8, name: 'c8'},
    {id: 9, name: 'c9'},
    {id: 10, name: 'c10'},
    {id: 11, name: 'c11'},
    {id: 12, name: 'c12'}
];

app.get('/products', (req, res) => {
    const productsSize = products.length;
    const itemsPerPage = 20;
    const desiredPage = parseInt(req.query.page) - 1;
    const firstElement = (desiredPage * itemsPerPage);
    const lastElement = desiredPage * itemsPerPage + itemsPerPage;
    if(!desiredPage
        || desiredPage === 1
        || firstElement >= productsSize){
        try {
            if(productsSize <= itemsPerPage)
                res.send(products);
            
            else
                res.send(products.slice(0,itemsPerPage));
                
        } catch (error) {
            console.log(error.message);
        }
        return;
    }
    
    try {
        const newarr = products.slice(firstElement,lastElement); 
        res.send(newarr);
    } catch (error) {
        console.log(error.message);
    }

});

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => app.listen(PORT, () => console.log("Server listening on port " + PORT)))
    .catch((error) => console.log(error.message));