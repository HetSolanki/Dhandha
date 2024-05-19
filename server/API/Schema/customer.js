import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
    cname: {
        type: String,
        required: true,
    },
    cphone_number: {
        type: Number,
        required: true,
        unique: true,
    },
    caddress: {
        type: String,
        required: true,
    },
    bottle_price: {
        type: Number,
        required: true,
    },
    delivery_sequence_number: {
        type: Number,
        required: true,
    },
  
    });

export default mongoose.model("Customer", customerSchema);