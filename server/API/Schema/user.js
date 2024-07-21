import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fname: {
    type: String,
    required: true,
  },
  lname: {
    type: String,
    required: true,
  },
  phone_number: {
    type: Number,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  bank_details: {    
    branch_ifsc_code: {
      type: String,
    },
    account_number: {
      type: Number,
    },
    benificiary_name: {
      type: String,
    },
  },
});

export default mongoose.model("User", userSchema);
