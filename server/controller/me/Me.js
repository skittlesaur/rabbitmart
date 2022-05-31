import Users from "../../model/Users.js";

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