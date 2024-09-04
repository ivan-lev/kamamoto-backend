const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: [true, "Нужно указать название категории на латиннице"],
      unique: true,
    },

    title: {
      type: String,
      required: [true, "Нужно указать название категории на русском"],
      unique: true,
    },

    thumbnail: {
      type: String,
      required: [true, "Нужно указать ссылку на файл с картинкой"],
    },
  },
  { versionKey: false }
);

module.exports = mongoose.model("category", categorySchema);
