const Partner = require("../models/partner");

const { NotFoundError, ValidationError, ConflictError } = require("../errors");

const { ERROR_MESSAGES } = require("../constants");

module.exports.getPartners = (req, res, next) => {
  Partner.find({})
    .then((partners) => res.send(partners))
    .catch((error) => next(error));
};

module.exports.createPartner = (req, res, next) => {
  const partner = req.body;

  Partner.create({ ...partner })
    .then((partner) => res.status(201).send(partner))
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

module.exports.getPartnerById = (req, res, next) => {
  Partner.findOne({ _id: req.params._id })
    .orFail()
    .then((partner) => {
      res.send(partner);
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

module.exports.updatePartner = (req, res, next) => {
  Partner.findOneAndUpdate({ _id: req.params._id }, req.body, {
    new: true,
    runValidators: true,
  })
    .orFail()
    .then((partner) => res.send(partner))
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

module.exports.deletePartner = (req, res, next) => {
  Partner.findOneAndDelete({ _id: req.params._id })
    .orFail()
    .then((partner) => res.send(partner))
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
