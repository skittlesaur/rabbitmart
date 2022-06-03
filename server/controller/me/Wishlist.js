import Users from "../../model/Users.js";
import axios from "axios";
import {PRODUCTS_BASEURL} from "../../services/BaseURLs.js";

export const getWishlist = async (req, res) => {
    const {id} = req.body;

    try {
        // get user's wishlist array
        const {wishlist} = await Users.findById(id);

        // request the products in the wishlist from the `Products` service
        const {data} = await axios.post(`${PRODUCTS_BASEURL}/arr`, {arr: wishlist});

        // respond with all products
        res.status(200).json(data);
    } catch (e) {
        res.status(400).json({message: e.message});
    }
}

export const updateWishlist = async (req, res) => {
    const {id, product_id} = req.body;
    try {
        const user = await Users.findById(id);

        // if the user doesn't have a wishlist defined yet set it to an empty array
        const wishlist = user.wishlist || [];

        // if the wishlist contains the item, remove it
        let newWishlist;
        if (wishlist.includes(product_id))
            newWishlist = wishlist.filter((item) => item !== product_id);
        else // else add it to the wishlist
            newWishlist = [...wishlist, product_id];

        // update the database with the new wishlist
        await Users.findByIdAndUpdate(id, {wishlist: newWishlist});

        // respond with the new wishlist
        res.status(201).json({wishlist: newWishlist});
    } catch (error) {
        res.status(409).json({message: error.message});
    }
}