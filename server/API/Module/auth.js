/* eslint-disable no-undef */
import { compare, hash } from "bcrypt";
import jwt from "jsonwebtoken";

export const hashPassword = (password) => {
  return hash(password, 10);
};

export const comparePassword = (password, hash) => {
  return compare(password, hash);
};

export const createJWT = (user) => {
  const token = jwt.sign(
    {
      id: user.id,
      username: user.phone_number,
    },
    process.env.JWT_SECRET
  );

  return token;
};

export const protect = (req, res, next) => {
  const bearer = req.headers.authorization;

  console.log(bearer);
  if (!bearer) {
    res.status(401);
    res.json({ message: "not authorized" });
    return;
  }

  const [, token] = bearer.split(" ");

  if (!token) {
    res.status(401);
    res.json({ message: "not valid token" });
    return;
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    console.log(user);
    req.user = user;
    next();
  } catch (error) {
    res.status(401);
    res.json({ message: "not valid token" });
    return;
  }
};
