import mongoose from "mongoose";
const {Schema} = mongoose;

const shipmentsschema = new Schema({
    order_id : Number,
    price: Number,
    Address: String,
    shippment_status: {type: String, enum: ['CREATED', 'SHIPPED','DELIVERED','RETURNED'], default: "CREATED"},
    ordered_at:Date
   
});
const shipments = mongoose.model('shipment',shipmentsschema);
export default shipments;