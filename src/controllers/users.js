const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const { ValidationError, ConflictError } = require("../errors");
const { ERROR_MESSAGES } = require("../constants");

const { JWT_SECRET, NODE_ENV } = process.env;

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === "production" ? JWT_SECRET : "secret-key",
        { expiresIn: "7d" }
      );
      res.send({ token });
    })
    .catch((error) => next(error));
};

module.exports.checkToken = (req, res, next) => {
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
