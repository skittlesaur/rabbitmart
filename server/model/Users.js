import mongoose from "mongoose";

const {Schema} = mongoose;

const Users = new Schema({
    first_name: {type: String},
    last_name: {type: String},
    email: {type: String, required: true},
    password: {type: String, required: true},
    role: {type: String, enum: ['USER', 'ADMIN'], default: "USER"},
    phone: {type: String}
});

const UsersSchema = mongoose.model('Users', Users);
export default UsersSchema;