const { celebrate, Joi } = require("celebrate");

module.exports.categoryValidator = celebrate({
  body: Joi.object().keys({
    category: Joi.string()
      .pattern(/^[a-z]+$/)
      .required()
      .messages({
        "string.base": `поле category должно быть строкой`,
        "string.empty": `поле category должно содержать значение`,
        "string.pattern.base": `поле category должно состоять из английских букв a-z`,
        "any.required": `поле category обязательное`,
      }),
    title: Joi.string()
      .pattern(/^[а-я]+$/)
      .required()
      .messages({
        "string.base": `поле title должно быть строкой`,
        "string.empty": `поле title должно содержать значение`,
        "string.pattern.base": `поле title должно состоять из русских букв а-я`,
        "any.required": `поле title обязательное`,
      }),
    thumbnail: Joi.string()
      .pattern(/\D+\.(jpg)$/)
      .required()
      .messages({
        "string.base": `поле thumbnail должно быть строкой`,
        "string.empty": `поле thumbnail должно содержать значение`,
        "string.pattern.base": `поле thumbnail должно состоять из английских букв и заканчиваться на .jpg`,
        "any.required": `поле thumbnail обязательное`,
      }),
  }),
});

module.exports.categoryDeleteValidator = celebrate({
  params: Joi.object().keys({
    category: Joi.string()
      .pattern(/^[a-z]+$/)
      .required()
      .messages({
        "string.base": `поле category должно быть строкой`,
        "string.empty": `поле category должно содержать значение`,
        "string.pattern.base": `поле category должно состоять из английских букв a-z`,
        "any.required": `поле category обязательное`,
      }),
  }),
});
