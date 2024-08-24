const Exhibit = require("../models/exhibit");
const Category = require("../models/category");

const { NotFoundError, ValidationError, ConflictError } = require("../errors");

const { ERROR_MESSAGES } = require("../constants");
const exhibit = require("../models/exhibit");

// module.exports.getExhibits = (req, res, next) => {
//   Exhibit.find({})
//     .then((exhibits) => res.send(exhibits))
//     .catch((error) => next(error));
// };

module.exports.getExhibits = (req, res, next) => {
  Exhibit.find({})
    .populate({
      path: "category",
      // Explicitly exclude `_id`
      select: "title -_id",
    })
    .then((exhibits) => res.send(exhibits))
    .catch((error) => next(error));
};

module.exports.findExhibitById = (req, res, next) => {
  Exhibit.findOne({ id: req.params.id })
    .orFail()
    .then((exhibit) => {
      console.log(exhibit);
      res.send(exhibit);
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

module.exports.createExhibit = (req, res, next) => {
  const exhibit = req.body;

  Exhibit.create({ ...exhibit })
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
  Exhibit.findOneAndDelete({ is: req.params.is })
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
  Exhibit.findOneAndUpdate({ is: req.params.is }, req.body, {
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
