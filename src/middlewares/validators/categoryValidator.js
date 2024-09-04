const { celebrate, Joi } = require("celebrate");

const { URL_REGEXP } = require("../../constants");

module.exports.categoryValidator = celebrate({
  body: Joi.object().keys({
    category: Joi.string().required(),
    title: Joi.string().required(),
    thumbnail: Joi.string().required(),
  }),
});

module.exports.categoryDeleteValidator = celebrate({
  body: Joi.object().keys({
    category: Joi.string().required(),
  }),
});
