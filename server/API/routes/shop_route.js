import { Router } from "express";
import { body } from "express-validator";
import { inputErrorHandler } from "../Module/middleware.js";
import {
  deleteShop,
  getShop,
  updateShop,
  createShop,
  uploadQR,
} from "../Handlers/Shop.js";
import { protect } from "../Module/auth.js";

const router = Router();

// Get Shop by uid
router.get("/getshop/:id", protect, getShop);

// Create Shop
router.post(
  "/createshop",
  [body("shop_name").exists()],
  inputErrorHandler,
  protect,
  createShop
);

// Update Shop
router.put(
  "/updateshop",
  [
    body("shop_  name").optional(),
    body("shop_address").optional(),
    body("image_url").optional(),
  ],
  inputErrorHandler,
  protect,
  updateShop
);

// Delete Shop
router.delete("/deleteshop/:id", protect, deleteShop);

router.post("/uploadqr", protect, uploadQR);

export default router;
