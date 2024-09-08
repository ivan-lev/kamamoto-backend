const { celebrate, Joi } = require("celebrate");

module.exports.signInValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});
