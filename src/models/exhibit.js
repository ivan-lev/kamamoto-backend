const mongoose = require("mongoose");
const validator = require("validator");

const exhibitSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: [true, "Нужно указать номер экспоната"],
      unique: true,
    },

    name: {
      type: String,
      required: [true, "Нужно указать названием экспоната"],
    },

    age: {
      type: String,
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "category",
      default: "66c7346ebc34b51d2a432a8d",
    },

    thumbnail: {
      type: String,
      required: [true, "Нужно выбрать превьюшку"],
      default: "thumb.jpg",
    },

    style: {
      type: String,
      required: [true, "Нужно выбрать стиль керамики"],
      // validate: {
      //   validator: (value: string) =>
      //     Object.values(CeramicStyleType).includes(value as CeramicStyleType),
      //   message: "Некорректная категория керамики",
      // },
    },

    potterName: {
      type: String,
    },

    potterJapaneseName: {
      type: String,
    },

    potterLifeDates: {
      type: String,
    },

    potterPhoto: {
      type: String,
      validate: {
        validator: (value) => validator.isURL(value),
        message: "Некорректный URL фотографии",
      },
    },

    potterInfo: {
      type: String,
    },

    description: {
      type: String,
      required: [true, "Нужно заполнить описание"],
    },

    additionalDescription: {
      type: String,
    },

    additionalPhotos: {
      type: Boolean,
    },

    additionalPhotosCount: {
      type: Number,
    },

    price: {
      type: Number,
      min: [0, "Дешевле не бывает"],
      default: 0,
    },

    weight: {
      type: Number,
      // required: [true, "Взвесь предмет"],
    },

    height: {
      type: Number,
      // required: [true, "Нужно указать высоту предмета"],
    },

    length: {
      type: Number,
      // required: [true, "Нужно указать высоту предмета"],
    },

    width: {
      type: Number,
      // required: [true, "Нужно указать высоту предмета"],
    },

    diameter: { type: Number },
    footDiameter: { type: Number },
    volume: { type: Number },
    weightOfSet: { type: Number },
    complectation: { type: String },
    preservation: { type: String },
  },
  { versionKey: false }
);

module.exports = mongoose.model("exhibit", exhibitSchema);
