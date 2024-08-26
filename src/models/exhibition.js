const mongoose = require("mongoose");
const validator = require("validator");

const exhibitionSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: [true, "Нужно указать id выставки"],
      unique: true,
    },

    year: {
      type: Number,
      required: [true, "Нужно указать год проведени выставки"],
    },

    dates: {
      type: String,
      required: [true, "Нужно указать даты начала и конца выставки"],
    },

    city: {
      type: String,
      required: [true, "Нужно указать город, где была выставка"],
    },

    address: {
      type: String,
      required: [true, "Нужно указать адрес, по которому проходила выставка"],
    },

    place: {
      type: String,
      required: [
        true,
        "Нужно указать название заведения, где проходила выставка",
      ],
    },

    name: {
      type: String,
      required: [true, "Нужно указать название выставки"],
    },

    link: {
      type: String,
    },

    description: {
      type: String,
      required: [true, "Нужно заполнить описание выставки"],
    },

    photos: {
      type: [
        {
          type: String,
        },
      ],
      default: [],
    },

    poster: {
      type: Boolean,
      required: [true, "Нужно указать есть ли постер у выставки"],
    },

    curators: {
      type: String,
    },

    organisators: {
      type: String,
    },

    isActive: {
      type: Boolean,
      required: [true, "Нужно указать, показывать страницу или нет"],
    },
  },

  { versionKey: false }
);

module.exports = mongoose.model("exhibition", exhibitionSchema);
