import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
    order_id: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        first: String,
        last: String
    },
    email: {type: String, required: false},
    phone_number: {type: String, required: false},
    address: {
        country: String,
        city: String,
        area: String,
        street: String,
        building_number: String,
        floor: String,
        apartment_number: String
    },
    ordered_at: {
        type: Date,
    },
    status: {
        type: String,
        enum: ['CREATED', 'PROCESSING', 'FULFILLED', 'CANCELLED'],
        default: 'CREATED'
    },
    products: {type: Array, required: true},
    total: {type: Number, required: true}
});

const Order = mongoose.model('Order', orderSchema);

export default Order;