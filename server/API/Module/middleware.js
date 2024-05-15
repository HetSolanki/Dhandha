import { validationResult } from "express-validator";

export const inputErrorHandler = async (req, res, next) => {
  const error = validationResult(req);

  if (!error.isEmpty()) {
    res.json({ message: error.array() });
  } else {
    next();
  }
};
