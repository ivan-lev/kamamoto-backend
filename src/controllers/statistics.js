const Exhibition = require("../models/exhibition");

module.exports.getExhibitionsCount = (req, res, next) => {
  Exhibition.estimatedDocumentCount()
    .then((count) => {
      res.send({ count: count });
    })
    .catch((error) => next(error));
};
