const { celebrate, Joi } = require("celebrate");

const { URL_REGEXP } = require("../../constants");

module.exports.partnerValidator = celebrate({
  body: Joi.object().keys({
    title: Joi.string().required(),
    link: Joi.string().pattern(URL_REGEXP).required(),
    logo: Joi.string().required(),
    isActive: Joi.boolean().required(),
  }),
});
