const Exhibition = require("../models/exhibition");

const { NotFoundError, ValidationError, ConflictError } = require("../errors");

const { ERROR_MESSAGES } = require("../constants");

module.exports.getExhibitions = (req, res, next) => {
  Exhibition.find({}, { _id: 0 })
    .then((exhibitions) => res.send(exhibitions))
    .catch((error) => next(error));
};

module.exports.createExhibition = (req, res, next) => {
  const exhibition = req.body;

  Exhibition.create({ ...exhibition })
    .then((exhibition) => res.status(201).send(exhibition))
    .catch((error) => {
      if (error.name === "CastError") {
        return next(new ValidationError(ERROR_MESSAGES.EXHIBITION_WRONG_ID));
      }

      if (error.name === "ValidationError") {
        return next(new ValidationError(ERROR_MESSAGES.EXHIBITION_WRONG_DATA));
      }

      if (error.code === 11000) {
        return next(new ConflictError(ERROR_MESSAGES.EXHIBITION_EXISTS));
      }

      if (error.name === "DocumentNotFoundError") {
        return next(new NotFoundError(ERROR_MESSAGES.EXHIBITION_NOT_FOUND));
      }

      return next(error);
    });
};

module.exports.getExhibitionById = (req, res, next) => {
  Exhibition.findOne({ id: req.params.id }, { _id: 0 })
    .orFail()
    .then((exhibition) => {
      res.send(exhibition);
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

module.exports.updateExhibition = (req, res, next) => {
  Exhibition.findOneAndUpdate({ id: req.params.id }, req.body, {
    new: true,
    runValidators: true,
    projection: { _id: 0 },
  })
    .orFail()
    .then((exhibition) => res.send(exhibition))
    .catch((error) => {
      if (error.name === "DocumentNotFoundError") {
        return next(new NotFoundError(ERROR_MESSAGES.EXHIBITION_NOT_FOUND));
      }

      if (error.name === "ValidationError") {
        return next(new ValidationError(ERROR_MESSAGES.EXHIBITION_WRONG_DATA));
      }

      if (error.name === "CastError") {
        return next(new NotFoundError(ERROR_MESSAGES.EXHIBITION_NOT_FOUND));
      }

      return next(error);
    });
};

module.exports.deleteExhibition = (req, res, next) => {
  Exhibition.findOneAndDelete({ id: req.params.id }, { _id: 0 })
    .orFail()
    .then((exhibition) => res.send(exhibition))
    .catch((error) => {
      if (error.name === "CastError") {
        return next(new ValidationError(ERROR_MESSAGES.EXHIBITION_WRONG_ID));
      }

      if (error.name === "DocumentNotFoundError") {
        return next(new NotFoundError(ERROR_MESSAGES.EXHIBITION_NOT_FOUND));
      }

      return next(error);
    });
};
