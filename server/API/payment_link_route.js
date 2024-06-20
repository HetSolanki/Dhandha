import { Router } from "express";
import { createPaymentLink } from "./Handlers/Payment_Link.js";
import { body } from "express-validator";
import { createPaymentLinkAll } from "./Handlers/Payment_Link_All.js";

const router = Router();

router.post(
  "/createpaymentlink",
  [
    body("amount").exists(),
    body("description").exists(),
    body("customer_name").exists(),
    body("customer_phone").exists(),
    body("smsnotify").exists(),
    body("emailnotify").exists(),
    body("reminder_enable").exists(),
    // body("customer_email").exists(),
    // body("payment_reference").exists(),
    // body("success_url").exists(),
    // body("failure_url").exists(),
  ],
  createPaymentLink
);

router.post(
  "/createpaymentlinkall",
  // [
  //   body("amount").exists(),
  //   body("description").exists(),
  //   body("customer_name").exists(),
  //   body("customer_phone").exists(),
  //   body("smsnotify").exists(),
  //   body("emailnotify").exists(),
  //   body("reminder_enable").exists(),
  //   // body("customer_email").exists(),
  //   // body("payment_reference").exists(),
  //   // body("success_url").exists(),
  //   // body("failure_url").exists(),
  // ],
  createPaymentLinkAll
);

// router.get("/payment_link/:id", getPaymentLink);

// router.get("/payment_links", getPaymentLinks);

// router.put("/payment_link/:id", updatePaymentLink);

// router.delete("/payment_link/:id", deletePaymentLink);

export default router;
