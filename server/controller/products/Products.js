import Products from '../../model/Products.js';
import jwt from 'jsonwebtoken';
import CSVtoJSON from 'csvtojson';

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

export const updateProducts = async (req, res) => {
    const {csv, mode} = req.body;

    switch (mode) {
        case "UPDATE":
            return updateProductsById(csv, res);
        case "REGENERATE":
            return deleteAllAndUpload(csv, res);
        default:
            return res.status(400).json({message: "Invalid Mode"});
    }
}

const updateProductsById = async (csv, res) => {
    try {
        const productsJSON = await CSVtoJSON().fromString(csv);
        const updatedProducts = [];

        for (const product of productsJSON) {
            const {modifiedCount} = await Products.updateOne({product_id: product.product_id}, product);
            if (modifiedCount)
                updatedProducts.push(product);
            else {
                const item = await Products.findOne({product_id: product.product_id});
                if (!item) {
                    const newItem = await Products.create(product);
                    updatedProducts.push(newItem);
                }
            }
        }

        res.status(200).json(updatedProducts);
    } catch (e) {
        res.status(400).json({message: e.message});
    }
}

const deleteAllAndUpload = async (csv, res) => {
    let fallback;
    try {
        const productsJSON = await CSVtoJSON().fromString(csv);
        fallback = await Products.find();
        await Products.deleteMany({});
        const products = await Products.insertMany(productsJSON);
        res.status(200).json(products);
    } catch (e) {
        await Products.insertMany(fallback);
        res.status(400).json({message: e.message});
    }
}