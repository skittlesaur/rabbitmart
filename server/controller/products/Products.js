import Products from '../../model/Products.js';
import jwt from 'jsonwebtoken';

export const productsSearch = async (req, res) => {
    try {
        const products = await Products.find({ "name": { $regex: req.query.search, $options: "i" } });

        const productsPaged = productsPagination(req.query.page, products);

        res.status(200).json(productsPaged);

    } catch (error) {
        res.status(404).json({ message: error.message });

    }
}

export const ShowProductsPerPage = async (req, res) =>{
    try {
        let products = [];

        const itemsPerPage = 2;
        
        // If there is category: just filter them by the category,
        // then do the pagination on it.
        if(req.query.category){
            products =await ShowProductsPerCategory(req.query.category, products);
        }
        else
            products = await Products.find();
        let numberOfPages = Math.ceil( products.length / itemsPerPage );
        // in both cases you have to paginate the products
        products = productsPagination(req.query.page, products, itemsPerPage);
        
        
        res.status(200).json({total_pages: numberOfPages,products: products});
        
    } catch (error) {
        res.status(500).json({ messasge: error.message });
    }
}

const ShowProductsPerCategory =async (category, products) => {
    try {
        
        products =await Products.find({ "category": {$eq: category} });
        return products;
        
    } catch (error) {
        throw error;
    }
}
export const PostProducts = async (req, res) =>{
    const product = req.body;
    const newProduct = new Products(product);
    try {
        await newProduct.save();
        res.status(201).send(newProduct);

    } catch (error) {
        res.status(409).json({ message: error.message });
    }
    
}

function GetSortOrder(prop) {    
    return function(a, b) {    
        if (a[prop] > b[prop]) {    
            return 1;    
        } else if (a[prop] < b[prop]) {    
            return -1;    
        }    
        return 0;    
    }    
}

export const ProductsRecommendations =async (req, res) => {
    try {
        let products =await Products.find();
        products.sort(GetSortOrder("category"));
        const limit = 5;
        let lastChosen = "";
        let lastCnt = 0;
        let result = [];

        for(let p in products){
            p = products[p];
            if(lastCnt == limit){
                if(lastChosen != p.category){
                lastChosen = p.category;
                lastCnt=1;
                result.push(p);}
            }
            else{
                lastCnt = lastCnt + 1;
                if(lastChosen != p.category){
                    lastCnt = 1;
                    lastChosen = p.category;
                }
                result.push(p);
            }

        }
        res.status(200).send(result);
    } catch (error) {
        res.status(500).json({ messasge: error.message });
    }
}

const productsPagination = (page, products, itemsPerPage) => {
    try {
        const productsSize = products.length;
        let desiredPage=0;
        if(page){
            desiredPage = parseInt(page) - 1;}

        const firstElement = (desiredPage * itemsPerPage);
        const lastElement = desiredPage * itemsPerPage + itemsPerPage;
        if(desiredPage === 0 || firstElement >= productsSize){
            
            if(productsSize <= itemsPerPage)
                return(products);
            
            else
                return((products).slice(0, itemsPerPage));
        }
        
        return(((products).slice(firstElement,lastElement)));
    } catch (error) {
        throw error;
    }
}

/**
 * Validates cart products before processing to purchasing
 *
 * @param {array<object>} req.body.cart - an array of user selected products
 */
export const validateCart = async (req, res) => {
    const {cart} = req.body;

    let totalPrice = 0;
    const products = [];

    try {
        for (const cartProduct of cart) {
            // get the product from database by id
            const product = await Products.findById(cartProduct._id.$oid);

            // 404 - the product doesn't exist in the database
            if (!product)
                return res.status(404).json({
                    message: `${cartProduct.name} was not found in the database`,
                    product_id: cartProduct._id.$oid,
                });

            // 400 - the product is out of stock
            if (!product.stock)
                return res.status(400).json({
                    message: `${product.name} is out of stock`,
                    product_id: product._id
                });

            // 400 - product stock is not enough for purchase
            if (product.stock < cartProduct.quantity)
                return res.status(400).json({
                    message: `Not enough stock for ${product.name} to complete the purchase. Requested items: ${cartProduct.quantity}`,
                    product_id: product._id
                });

            // calculate total price from the databse
            totalPrice += product.price * cartProduct.quantity;

            // add products ids to the `products` array
            products.push(product._id);
        }

        // generate validation/checkout token
        const token = jwt.sign(
            {products: products, total_price: totalPrice},
            process.env.JWT_SECRET_KEY,
            {expiresIn: process.env.JWT_CHECKOUT_TTL});

        // validated successfully
        return res.status(200).json({
            total_price: totalPrice,
            cart: cart,
            token: token
        });
    } catch (e) {
        // internal error
        return res.status(500).json({
            message: e.message
        });
    }
}
