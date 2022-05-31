
import shipments from '../../model/shipments.js';
import jwt from 'jsonwebtoken';
//import { status } from 'express/lib/response';

export const getshipments = async (req, res) => {
    const order_id=req.params.order_id;
    try {
        const your_shipment = await shipments.findOne({"order_id":order_id});
        return res.status(200).json({
            your_shipment: {
                order_id: your_shipment.order_id,
                price: your_shipment.price,
                Address: your_shipment.Address,
                shippment_status: your_shipment.shippment_status,
                ordered_at:your_shipment.ordered_at
            },
        });
        //return res.status(200).json({message: indexed_shipment})
    } catch (e) {
        return res.status(400).json({message: e.message});
    }

}
   
        

export const updateshipments= async(req, res) => {

try{
    
    const {shippment_status}=req.body;
if(!shippment_status)
    return res.status(400).json({message: "Please provide the new status"});

if(shippment_status!=='CREATED'  && shippment_status!=='SHIPPED'  && shippment_status!=='DELIVERED'   && shippment_status !=='RETURNED' )
    return res.status(400).json({message: "Please re-type the status correctly "});

const filtered={ order_id:req.params.order_id};
//const filtered={ order_id:2};
let  updated={ shippment_status:shippment_status};
let your_status=await shipments.findOneAndUpdate(filtered, updated ,{new: true});
//const err = await your_status.save().catch(err => err);
await your_status.save();
//const doc = await shipments.findOne({shippment_status:new_satus});

return res.status(200).json({your_status:{
    shippment_status: your_status.shippment_status
}});
}
catch(e){
    return res.status(400).json({message: e.message});
}}

export const postshipments= async (req, res) => {
    const { ordered_at, order_id, Address, price } = req.body;
    // shipments.create({ price:price,ordered_at:ordered_at,Address:Address,order_id:order_id,shippment_status:shippment_status}, function (err, small) {
    //     if (err) 
    //     return res.status(400).json({message: "Can't add a new record"});
    //   })
       const new_user = new shipments({price:price,ordered_at:ordered_at,Address:Address,order_id:order_id,shippment_status:'CREATED'});
    //   new_user.save(function (err) {
    //     if (err) 
    //     return res.status(400).json({message: "Can't add a new record"});
    //   });
    // await shipments.create({ price: price }, { ordered_at: ordered_at }, { Address: Address }, { order_id: order_id }, { shippment_status: 'RETURNED' }, function (err, data) {
    //     if (err) 
    //     return handleError(err);
    //     else  
    //     {return res.status(400).json({message: "your record is created"});
    // }
    //   });
    await new_user.save(function (err) {
        if (err) return handleError(err);
        else
        {return res.status(400).json({message: "your record is created"});
      }});
  
    }
   


