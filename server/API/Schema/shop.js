import mongoose from "mongoose";

export const shopSchema = new mongoose.Schema({
  shop_name: {
    type: String,
    required: true,
  },
  shop_address: {
    type: String,
  },
  uid: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  publicid: {
    type: String,
  },
});

export default mongoose.model("Shop", shopSchema);
