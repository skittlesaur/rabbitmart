import ProductSchema from "../../model/Products.js";

export const productsSearch = async (req, res) => {
    try {
        const products = await ProductSchema.find({ "name": { $regex: req.query.search, $options: "i" } });

        const productsPaged = productsPagination(req.query.page, products);

        res.status(200).json(productsPaged);

    } catch (error) {
        res.status(404).json({ message: error.message });

    }
}
export const ShowProductsPerPage = async (req, res) =>{
    try {
        const allProductsJSON = await ProductSchema.find();

        const products = productsPagination(req.query.page, allProductsJSON);

        res.status(200).json(products);
        
    } catch (error) {
        res.status(500).json({ messasge: error.message });
    }
}


export const PostProducts = async (req, res) =>{
    const product = req.body;
    const newProduct = new ProductSchema(product);
    try {
        await newProduct.save();
        res.status(201).send(newProduct);

    } catch (error) {
        res.status(409).json({ message: error.message });
    }
    
}

const productsPagination = (page, productsJSON) => {
    try {
        var products = [];
        for(var i in productsJSON){
            products.push(productsJSON[i]);
        }

        const productsSize = products.length;
        const itemsPerPage = 2;
        var desiredPage=0;
        if(page){
            desiredPage = parseInt(page) - 1;}

        const firstElement = (desiredPage * itemsPerPage);
        const lastElement = desiredPage * itemsPerPage + itemsPerPage;
        if(desiredPage === 0 || firstElement >= productsSize){
            
            if(productsSize <= itemsPerPage)
                return(products);
            
            else
                return(products.slice(0, itemsPerPage));
        }
        
        return((products.slice(firstElement,lastElement)));
    } catch (error) {
        throw error;
    }
}
