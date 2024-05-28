import { createJWT, hashPassword } from "../Module/auth.js";
import User from "../Schema/user.js";
import { comparePassword } from "../Module/auth.js";

export const getAllUser = async (req, res) => {
  try {
    const allUsers = await User.find({});
    res.json({ data: allUsers, status: "success" });
  } catch (error) {
    res.json({ message: "Error" });
  }
};

export const getOneUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  res.json({ data: user, status: "success" });
};

export const createUser = async (req, res) => {
  try {
    if (await User.findOne({ phone_number: req.body.phone_number })) {
      return res.json({ data: "User Already Exists", status: "failed" });
    }

    const newUser = await User.create({
      fname: req.body.fname,
      lname: req.body.lname,
      phone_number: req.body.phone_number,
      email: req.body.email,
      password: await hashPassword(req.body.password),
    });

    const token = createJWT(newUser);
    res.json({ token, status: "success", cid: newUser._id });
  } catch (error) {
    res.json({ error });
  }
};

export const updateUser = async (req, res) => {
  const updatedUser = await User.findByIdAndUpdate(
    req.params.id,
    {
      fname: req.body.fname,
      lname: req.body.lname,
      phone_number: req.body.phone_number,
      email: req.body.email,
      // password: await hashPassword(req.body.password),
    },
    { new: true }
  );

  res.json({ data: updatedUser, status: "success" });
};

export const deleteUser = async (req, res) => {
  const deletedUser = await User.findByIdAndDelete(req.params.id);
  res.json({ data: deletedUser, status: "success" });
};

export const signIn = async (req, res) => {
  try {
    const user = await User.findOne({ phone_number: req.body.phone_number });

    if (user) {
      console.log(user);
      if (await comparePassword(req.body.password, user.password)) {
        const token = createJWT(user);
        res.json({ token, success: true, cid: user._id });
      } else {
        res.json({ data: "Invalid Credentials", status: "failed" });
      }
    } else {
      res.json({ data: "Invalid Phone Number", status: "failed" });
    }
  } catch (error) {
    res.json({ error });
  }
};
