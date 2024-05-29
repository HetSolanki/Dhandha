import { Router as Route } from "express";
import { body } from "express-validator";
import {
  getAllCustomerEntry,
  getOneCustomerEntry,
  createCustomerEntry,
  updateCustomerEntry,
  deleteCustomerEntry,
} from "./Handlers/CustomerEntry.js";
import { inputErrorHandler } from "./Module/middleware.js";
import cors from "cors";
import { protect } from "./Module/auth.js";

const router = Route();
router.use(cors());

// Get All the Customer Entry
router.get("/getallcustomerentry/:id", protect, getAllCustomerEntry);

// Get Customer Entry by it's id
router.get("/getcustomerentry/:id", getOneCustomerEntry);

// Create Customer Entry
router.post(
  "/addcustomerentry",
  [
    body("cid").exists(),
    body("bottle_count").exists(),
    body("delivery_date").exists(),
    body("delivery_status").exists(),
  ],
  inputErrorHandler,
  createCustomerEntry
);

// Update Customer Entry
router.put(
  "/updatecustomerentry/:id",
  [
    body("cid").optional(),
    body("bottle_count").optional(),
    body("delivery_date").optional(),
    body("delivery_status").optional(),
  ],
  inputErrorHandler,
  updateCustomerEntry
);

// Delete Customer Entry
router.delete("/removecustomerentry/:id", deleteCustomerEntry);

export default router;
