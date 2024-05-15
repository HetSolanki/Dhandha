import User from "../Schema/user.js";

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
  const newUser = await User.create({
    phone_number: req.body.phone_number,
    email: req.body.email,
    password: req.body.password,
  });

  res.json({ data: newUser, status: "success" });
};

export const updateUser = async (req, res) => {
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
};

export const deleteUser = async (req, res) => {
  const deletedUser = await User.findByIdAndDelete(req.params.id);
  res.json({ data: deletedUser, status: "success" });
};
