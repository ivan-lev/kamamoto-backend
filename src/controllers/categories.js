const Category = require("../models/category");
const Exhibit = require("../models/exhibit");

const { NotFoundError, ValidationError, ConflictError } = require("../errors");

const { ERROR_MESSAGES } = require("../constants");

module.exports.getCategories = (req, res, next) => {
  Category.find({}, "-_id")
    .then((categories) => res.send(categories))
    .catch((error) => next(error));
};

module.exports.getCategoryExhibits = (req, res, next) => {
  Category.findOne({ category: req.params.category })
    .orFail()
    .then((category) => {
      console.log(category._id.toString());
      Exhibit.find({ exhibitCategory: category._id })
        .then((exhibits) => res.send(exhibits))
        .catch((error) => {
          return next(error);
        });
    })
    .catch((error) => {
      if (error.name === "CastError") {
        return next(new ValidationError(ERROR_MESSAGES.EXHIBIT_WRONG_ID));
      }

      if (error.name === "DocumentNotFoundError") {
        return next(new NotFoundError(ERROR_MESSAGES.EXHIBIT_NOT_FOUND));
      }

      return next(error);
    });
};

module.exports.createCategory = (req, res, next) => {
  const category = req.body;

  Category.create({ ...category })
    .then((exhibit) => res.status(201).send(exhibit))
    .catch((error) => {
      if (error.name === "CastError") {
        return next(new ValidationError(ERROR_MESSAGES.EXHIBIT_WRONG_ID));
      }

      if (error.name === "ValidationError") {
        return next(new ValidationError(ERROR_MESSAGES.EXHIBIT_WRONG_DATA));
      }

      if (error.code === 11000) {
        return next(new ConflictError(ERROR_MESSAGES.EXHIBIT_EXISTS));
      }

      return next(error);
    });
};

module.exports.deleteExhibit = (req, res, next) => {
  Exhibit.findOneAndDelete({ exhibitId: req.params.exhibitId })
    .orFail()
    .then((exhibit) => res.send(exhibit))
    .catch((error) => {
      if (error.name === "CastError") {
        return next(new ValidationError(ERROR_MESSAGES.EXHIBIT_WRONG_ID));
      }

      if (error.name === "DocumentNotFoundError") {
        return next(new NotFoundError(ERROR_MESSAGES.EXHIBIT_NOT_FOUND));
      }

      return next(error);
    });
};

module.exports.updateExhibit = (req, res, next) => {
  Exhibit.findOneAndUpdate({ exhibitId: req.params.exhibitId }, req.body, {
    new: true,
    runValidators: true,
  })
    .orFail()
    .then((exhibit) => res.send(exhibit))
    .catch((error) => {
      if (error.name === "DocumentNotFoundError") {
        return next(new NotFoundError(ERROR_MESSAGES.EXHIBIT_NOT_FOUND));
      }

      if (error.name === "ValidationError") {
        return next(new ValidationError(ERROR_MESSAGES.EXHIBIT_WRONG_DATA));
      }

      if (error.name === "CastError") {
        return next(new NotFoundError(ERROR_MESSAGES.EXHIBIT_NOT_FOUND));
      }

      if (error.code === 11000) {
        return next(new ConflictError(ERROR_MESSAGES.EXHIBIT_EXISTS));
      }

      return next(error);
    });
};
