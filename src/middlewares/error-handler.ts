const { ERROR_MESSAGES } = require('../constants');

import { Request, Response, NextFunction, ErrorRequestHandler } from "express";

export const errorHandler: ErrorRequestHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  // if error was not catched before, give it status 500
  const { statusCode = 500, message } = err;

  res.status(statusCode).send({
    // if status 500, generate default message for 500 error
    message: statusCode === 500 ? ERROR_MESSAGES.DEFAULT_MESSAGE : message,
  });
  next();
};