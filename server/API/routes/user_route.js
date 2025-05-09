import { Router } from "express";
import { body } from "express-validator";
import {
  getAllUser,
  getOneUser,
  createUser,
  updateUser,
  deleteUser,
  signIn,
  updateBankDetails,
} from "../Handlers/User.js";
import { inputErrorHandler } from "../Module/middleware.js";
const accountSid = "AC7d6926caa8ace8f5820150f5d89fb768";
const authToken = "b51a77e0a6b00760f5ff44a59af76677";
const verifySid = "VA097428b48fdc2b4d8b0ba5eb4f26c7f6";
import twilio from "twilio";
//     ^ this will select default export

const client = twilio(accountSid, authToken);

const router = Router();
// Get All the Users
router.get("/userall", getAllUser);

// Get User by it's id
router.get("/user/:id", getOneUser);

// Create User
router.post(
  "/user",
  [
    body("fname").exists(),
    body("lname").exists(),
    body("phone_number").exists(),
    body("email").optional(),
    body("password").exists(),
  ],
  inputErrorHandler,
  createUser
);

// Update User
router.put(
  "/user/:id",
  [
    body("fname").optional(),
    body("lname").optional(),
    body("phone_number").optional(),
    body("email").optional(),
    body("password").optional(),
  ],
  inputErrorHandler,
  updateUser
);

// Delete User
router.delete("/user/:id", deleteUser);

// Bank Details
router.put(
  "/user/bankdetails/:id",
  [
    body("branch_ifsc_code").exists(),
    body("account_number").exists(),
    body("benificiary_name").exists(),
  ],
  inputErrorHandler,
  updateBankDetails
);

// signin user
router.post(
  "/signin",
  [body("phone_number").exists(), body("password").exists()],
  inputErrorHandler,
  signIn
);

export default router;
