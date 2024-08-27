const { celebrate, Joi } = require("celebrate");

module.exports.signValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});
