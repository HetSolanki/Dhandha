import { Router as Route } from "express";
import { body } from "express-validator";
import { inputErrorHandler } from "./Module/middleware.js";
import cors from "cors";
import { protect } from "./Module/auth.js";
import {
  createPaymentEntry,
  deletePaymentEntry,
  getAllPaymentDetails,
  getAllPaymentDetailsCurrentMonth,
  getAllPaymentEntrys,
  updatePaymentEntry,
} from "./Handlers/PaymentDetials.js";

const router = Route();
router.use(cors());

// Get All the Payment Details
router.get("/getallpaymentdetails/:id", protect, getAllPaymentDetails);

// Get All the Payment Details
router.get("/getallpaymentdetails/", protect, getAllPaymentDetails);

// Get All Payment Entrys
router.get("/getAllPaymentEntrys/", protect, getAllPaymentEntrys);

// Get All the Payment Details of the Current Month
router.get(
  "/getallpaymentdetailscurrentmonth",
  protect,
  getAllPaymentDetailsCurrentMonth
);

// Get Payment Details by it's id
// router.get("/getpaymentdetails/:id", getOnePaymentDetails);

// Create Payment Details
router.post(
  "/addpaymentdetails",
  [
    body("payment_date").exists(),
    body("amount").exists(),
    body("payment_status").exists(),
  ],
  inputErrorHandler,
  createPaymentEntry
);

// Update Payment Details
router.put(
  "/updatepaymentdetails/:id",
  [
    body("payment_date").optional(),
    body("payment_amount").optional(),
    body("payment_status").optional(),
  ],
  inputErrorHandler,
  updatePaymentEntry
);

// Delete Payment Details
router.delete("/deletepaymentdetails/:id", protect, deletePaymentEntry);


export default router;
