import Products from '../../model/Products.js';
import jwt from 'jsonwebtoken';
import CSVtoJSON from "../../utils/CSVtoJSON.js";

export const productsSearch = async (req, res) => {
    try {
        const products = await Products.find({"name": {$regex: req.query.search, $options: "i"}});

        const productsPaged = productsPagination(req.query.page, products);

        res.status(200).json(productsPaged);

    } catch (error) {
        res.status(404).json({message: error.message});

    }
}

export const ShowProductsPerPage = async (req, res) => {
    try {
        const allProductsJSON = await Products.find();

        const products = productsPagination(req.query.page, allProductsJSON);

        res.status(200).json(products);

    } catch (error) {
        res.status(500).json({messasge: error.message});
    }
}

export const PostProducts = async (req, res) => {
    const product = req.body;
    const newProduct = new Products(product);
    try {
        await newProduct.save();
        res.status(201).send(newProduct);

    } catch (error) {
        res.status(409).json({message: error.message});
    }

}

const productsPagination = (page, productsJSON) => {
    try {
        var products = [];
        for (var i in productsJSON) {
            products.push(productsJSON[i]);
        }

        const productsSize = products.length;
        const itemsPerPage = 2;
        var desiredPage = 0;
        if (page) {
            desiredPage = parseInt(page) - 1;
        }

        const firstElement = (desiredPage * itemsPerPage);
        const lastElement = desiredPage * itemsPerPage + itemsPerPage;
        if (desiredPage === 0 || firstElement >= productsSize) {

            if (productsSize <= itemsPerPage)
                return (products);

            else
                return (products.slice(0, itemsPerPage));
        }

        return ((products.slice(firstElement, lastElement)));
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

export const adminUpdateProducts = async (req, res) => {
    const {csv, mode} = req.body;

    if (!['UPDATE', 'REGENERATE'].includes(mode))
        return res.status(400).json({message: " Unknown mode"});

    const productsJson = CSVtoJSON(csv);

    try {
        if (mode === "UPDATE") {
            const updatedProducts = await updateProducts(productsJson);
            return res.status(200).json(updatedProducts);
        }

        if (mode === 'REGENERATE') {
            const updatedProducts = await regenerateDatabase(productsJson);
            return res.status(200).json(updatedProducts);
        }

    } catch (e) {
        res.status(400).json({message: e.message});
    }
}

const updateProducts = async (products) => {
    const updated = [];

    for (const product of products) {
        const res = await Products.updateOne({product_id: product.product_id}, product);

        // if the product was updated push it to the array
        if (res.modifiedCount !== 0)
            updated.push(product);
        // if the product doesn't exist in the database, add it
        else if (res.matchedCount === 0) {
            await Products.create(product);
            updated.push(product);
        }
    }

    return updated;
}

const regenerateDatabase = async (products) => {
    await Products.deleteMany();
    await Products.insertMany(products);
    return products;
}