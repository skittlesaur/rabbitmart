import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
    order_id: {
        type: String,
        required: true,
        unique: true 
    },
    name: String,
    email: String,
    phone_number: String,
    address: {
        country: String,
        city: String,
        area: String,
        street: String,
        building_number: String,
        floor: String,
        apartment_number: String
    },
    orderStatus: {
        type: String,
        enum: ['CREATED', 'PROCESSING', 'FULFILLED', 'CANCELLED'],
        default: 'CREATED'
    },
    products: { type: Array }

});

const Order = mongoose.model('Order', orderSchema);

export default Order;