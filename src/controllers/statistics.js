const Exhibition = require("../models/exhibition");
const Exhibit = require("../models/exhibit");

module.exports.getExhibitionsCount = (req, res, next) => {
  Promise.all([
    Exhibit.estimatedDocumentCount(),
    Exhibition.estimatedDocumentCount(),
  ])
    .then((results) => {
      const [exhibits, exhibitions] = results;
      res.send({ exhibits, exhibitions });
    })
    .catch((error) => next(error));
};
