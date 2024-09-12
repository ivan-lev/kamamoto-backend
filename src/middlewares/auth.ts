import { JWT_SECRET, NODE_ENV } from "../config";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const { AuthorizationError } = require("../errors");
const { ERROR_MESSAGES } = require("../constants");

export const auth = (req: any, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  // pass next all get requests if it is not user login checking
  if (req.method === "GET" && req.originalUrl !== "/users/") {
    return next();
  }

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return next(new AuthorizationError(ERROR_MESSAGES.UNAUTHORIZED));
  }

  const token = authorization.replace("Bearer ", "");
  let payload;

  try {
    payload = jwt.verify(
      token,
      NODE_ENV === "production" ? JWT_SECRET : "secret-key"
    );
  } catch (err) {
    return next(new AuthorizationError(ERROR_MESSAGES.UNAUTHORIZED));
  }

  req.user = payload;
  return next();
};
