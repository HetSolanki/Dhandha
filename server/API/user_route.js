import { Router } from "express";
import { body } from "express-validator";
import {
  getAllUser,
  getOneUser,
  createUser,
  updateUser,
  deleteUser,
  signIn,
} from "./Handlers/User.js";
import { inputErrorHandler } from "./Module/middleware.js";
import { protect } from "./Module/auth.js";

const router = Router();

// Get All the Users
router.get("/userall", getAllUser);

// Get User by it's id
router.get(
  "/user/:id",
  getOneUser
);

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

// signin user
router.post(
  "/signin",
  [body("phone_number").exists(), body("password").exists()],
  inputErrorHandler,
  signIn
);
export default router;
