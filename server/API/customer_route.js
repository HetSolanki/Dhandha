import { Router as Route } from "express";
import { body } from "express-validator";
import {
  getAllCustomer,
  getOneCustomer,
  createCustomer,
  updateCustomer,
  deleteCustomer,
} from "./Handlers/Customer.js";
import { inputErrorHandler } from "./Module/middleware.js";
import cors from "cors";

const router = Route();
router.use(cors());
// Get All the Customers
router.get("/customerall", getAllCustomer);

// Get Customer by it's id
router.get("/customer/:id", getOneCustomer);

// Create Customer
router.post(
  "/customer",
  [
    body("cname").exists(),
    body("cphone_number").exists(),
    body("caddress").exists(),
    body("bottle_price").exists(),
    body("delivery_sequence_number").exists(),
  ],
  inputErrorHandler,
  createCustomer
);

// Update Customer
router.put(
  "/customer/:id",
  [
    body("cname").optional(),
    body("cphone_number").optional(),
    body("caddress").optional(),
    body("bottle_price").optional(),
    body("delivery_sequence_number").optional(),
  ],
  inputErrorHandler,
  updateCustomer
);

// Delete Customer
router.delete("/customer/:id", deleteCustomer);

export default router;
