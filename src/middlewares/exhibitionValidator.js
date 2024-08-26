const { celebrate, Joi } = require("celebrate");

const { URL_REGEXP } = require("../constants");

module.exports.exhibitionValidator = celebrate({
  body: Joi.object().keys({
    id: Joi.number().greater(0).required(),
    year: Joi.number().greater(2020).required(),
    dates: Joi.string().min(5).required(),
    city: Joi.string().required(),
    address: Joi.string().required(),
    place: Joi.string().required().required(),
    name: Joi.string().required().required(),
    link: Joi.string().allow("").pattern(URL_REGEXP),
    description: Joi.string().allow("").required(),
    photos: Joi.array().items(Joi.string()),
    poster: Joi.boolean().required(),
    curators: Joi.string().allow(""),
    organisators: Joi.string().allow(""),
    isActive: Joi.boolean().required(),
  }),
});

module.exports.exhibitionIdValidator = celebrate({
  params: Joi.object().keys({
    id: Joi.number().greater(0).required(),
  }),
});
