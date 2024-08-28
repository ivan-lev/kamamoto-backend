const mongoose = require("mongoose");
const validator = require("validator");

const partnerSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Нужно указать название организации"],
    },

    link: {
      type: String,
      required: [true, "Нужно указать ссылку на сайт организации"],
      validate: {
        validator: (v) => validator.isURL(v),
        message: "Некорректная ссылка",
      },
    },

    logo: {
      type: String,
      required: [true, "Нужно указать название логотипа"],
    },

    isActive: {
      type: Boolean,
      required: [true, "Нужно указать активность партнёра"],
    },
  },
  { versionKey: false }
);

module.exports = mongoose.model("partner", partnerSchema);
