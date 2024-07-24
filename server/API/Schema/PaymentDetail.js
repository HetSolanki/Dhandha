import mongoose from "mongoose";

const paymentDetailSchema = new mongoose.Schema(
    {
        cid: {
        type: mongoose.Schema.ObjectId,
        ref: "Customer",
        },
        amount: {
        type: Number,
        required: true,
        },
        payment_date: {
        type: String,
        required: true,
        },
        payment_status: {
        type: String,
        required: true,
        },
    },
    { timestamps: true }
    );

export default mongoose.model("PaymentDetail", paymentDetailSchema);