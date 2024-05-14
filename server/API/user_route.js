import { Router } from "express";
import User from "./Schema/user.js";

const router = Router();

// Get All the Users
router.get("/user", async (req, res) => {
  const allUsers = await User.find({});
  res.json({ data: allUsers });
});

// Get User by it's id
router.get("/user/:id", async (req, res) => {
  const user = await User.findById(req.params.id);
  res.json({ data: user, status: "success" });
});

// Create User
router.post("/user", async (req, res) => {
  console.log(req.body);
  const newUser = await User.create({
    phone_number: req.body.phone_number,
    email: req.body.email,
    password: req.body.password,
  });

  res.json({ data: newUser, status: "success" });
});

// Update User
router.put("/user/:id", async (req, res) => {
  const updatedUser = await User.findByIdAndUpdate(
    req.params.id,
    {
      phone_number: req.body.phone_number,
      email: req.body.email,
      password: req.body.password,
    },
    { new: true }
  );

  res.json({ data: updatedUser, status: "success" });
});

// Delete User
router.delete("/user/:id", async (req, res) => {
  const deletedUser = await User.findByIdAndDelete(req.params.id);
  res.json({ data: deletedUser, status: "success" });
});

export default router;
