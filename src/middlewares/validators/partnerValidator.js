const { celebrate, Joi } = require("celebrate");

const { URL_REGEXP } = require("../../constants");

module.exports.partnerCreateValidator = celebrate({
  body: Joi.object().keys({
    title: Joi.string().required(),
    link: Joi.string().pattern(URL_REGEXP).required(),
    logo: Joi.string().required(),
    isActive: Joi.boolean().required(),
  }),
});

module.exports.partnerUpdateValidator = celebrate({
  body: Joi.object().keys({
    _id: Joi.string().hex().required(),
    title: Joi.string().required(),
    link: Joi.string().pattern(URL_REGEXP).required(),
    logo: Joi.string().required(),
    isActive: Joi.boolean().required(),
  }),
});

module.exports.partnerIdValidator = celebrate({
  params: Joi.object().keys({
    _id: Joi.string().hex().required(),
  }),
});
