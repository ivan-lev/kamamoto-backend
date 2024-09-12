import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import User from "../models/user";

const { ValidationError, NotFoundError } = require("../errors");
const { ERROR_MESSAGES } = require("../constants");

export const login = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  const NODE_ENV = process.env.NODE_ENV as string;
  const JWT_SECRET = process.env.JWT_SECRET as string;

  return User.findUserByCredentials(email, password)
    .then((user: any) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === "production" ? JWT_SECRET : "secret-key",
        { expiresIn: "7d" }
      );
      res.send({ token });
    })
    .catch((error: any) => next(error));
};

export const checkToken = (req: any, res: Response, next: NextFunction) => {
  const currentUserId = req.user._id;

  User.findById(currentUserId, {
    _id: 1,
    email: 1,
    name: 1,
  })
    .orFail()
    .then((user) => res.send({ answer: "Token checked!" }))
    .catch((error) => {
      if (error.name === "CastError") {
        return next(new ValidationError(ERROR_MESSAGES.USER_WRONG_ID));
      }

      if (error.name === "DocumentNotFoundError") {
        return next(new NotFoundError(ERROR_MESSAGES.USER_NOT_FOUND));
      }

      return next(error);
    });
};
