import { Router } from "express";
import User from "./Schema/user.js";
import { body } from "express-validator";
import {
  getAllUser,
  getOneUser,
  createUser,
  updateUser,
  deleteUser,
} from "./Handlers/User.js";
import { inputErrorHandler } from "./Module/middleware.js";

const router = Router();

// Get All the Users
router.get("/userall", getAllUser);

// Get User by it's id
router.get(
  "/user",
  [body("phone_number").exists(), body("password").exists()],
  inputErrorHandler,
  getOneUser
);

// Create User
router.post(
  "/user",
  [
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
router.post("/signin", async (req, res) => {
  const user = await User.findOne({ phone_number: req.body.phone_number });
  // console.log(user.password)
  if (user.password === req.body.password) {
    res.json({ data: user, success: true });
  } else {
    res.json({ data: "Invalid Credentials", status: "failed" });
  }
});
export default router;
