const Exhibition = require("../models/exhibition");

const { NotFoundError, ValidationError, ConflictError } = require("../errors");

const { ERROR_MESSAGES } = require("../constants");

module.exports.getExhibitions = (req, res, next) => {
  Exhibition.find({})
    .then((exhibitions) => res.send(exhibitions))
    .catch((error) => next(error));
};

module.exports.createExhibition = (req, res, next) => {
  const exhibition = req.body;

  Exhibition.create({ ...exhibition })
    .then((exhibition) => res.status(201).send(exhibition))
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

// module.exports.findExhibitById = (req, res, next) => {
//   Exhibit.findOne({ exhibitId: req.params.exhibitId })
//     .orFail()
//     .then((exhibit) => {
//       console.log(exhibit);
//       res.send(exhibit);
//     })
//     .catch((error) => {
//       if (error.name === "CastError") {
//         return next(new ValidationError(ERROR_MESSAGES.EXHIBIT_WRONG_ID));
//       }

//       if (error.name === "DocumentNotFoundError") {
//         return next(new NotFoundError(ERROR_MESSAGES.EXHIBIT_NOT_FOUND));
//       }

//       return next(error);
//     });
// };

// module.exports.deleteExhibit = (req, res, next) => {
//   Exhibit.findOneAndDelete({ exhibitId: req.params.exhibitId })
//     .orFail()
//     .then((exhibit) => res.send(exhibit))
//     .catch((error) => {
//       if (error.name === "CastError") {
//         return next(new ValidationError(ERROR_MESSAGES.EXHIBIT_WRONG_ID));
//       }

//       if (error.name === "DocumentNotFoundError") {
//         return next(new NotFoundError(ERROR_MESSAGES.EXHIBIT_NOT_FOUND));
//       }

//       return next(error);
//     });
// };

// module.exports.updateExhibit = (req, res, next) => {
//   Exhibit.findOneAndUpdate({ exhibitId: req.params.exhibitId }, req.body, {
//     new: true,
//     runValidators: true,
//   })
//     .orFail()
//     .then((exhibit) => res.send(exhibit))
//     .catch((error) => {
//       if (error.name === "DocumentNotFoundError") {
//         return next(new NotFoundError(ERROR_MESSAGES.EXHIBIT_NOT_FOUND));
//       }

//       if (error.name === "ValidationError") {
//         return next(new ValidationError(ERROR_MESSAGES.EXHIBIT_WRONG_DATA));
//       }

//       if (error.name === "CastError") {
//         return next(new NotFoundError(ERROR_MESSAGES.EXHIBIT_NOT_FOUND));
//       }

//       if (error.code === 11000) {
//         return next(new ConflictError(ERROR_MESSAGES.EXHIBIT_EXISTS));
//       }

//       return next(error);
//     });
// };
