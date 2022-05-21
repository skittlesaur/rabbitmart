import ProductSchema from "../../model/Products.js";

export const ShowProductsPerPage = async (req, res) =>{
    try {
        const allProductsJSON = await ProductSchema.find();

        var products = [];
        for(var i in allProductsJSON){
            products.push(allProductsJSON[i]);
        }

        const productsSize = products.length;
        const itemsPerPage = 2;
        var desiredPage=0;
        if(req.query.page){
            desiredPage = parseInt(req.query.page) - 1;}

        const firstElement = (desiredPage * itemsPerPage);
        const lastElement = desiredPage * itemsPerPage + itemsPerPage;
        if(desiredPage === 0 || firstElement >= productsSize){
            
            if(productsSize <= itemsPerPage)
                res.status(200).json((products));
            
            else
                res.status(200).json((products.slice(0,itemsPerPage)));
                
            return;
        }
        
        res.status(200).json((products.slice(firstElement,lastElement)));
        
    } catch (error) {
        res.status(500).json(error.message);
    }
}


export const PostProducts = async (req, res) =>{
    const product = req.body;
    const newProduct = new ProductSchema(product);
    try {
        await newProduct.save();
        res.status(201).send(newProduct);

    } catch (error) {
        res.status(409).json({message: error.message});
    }
    
}