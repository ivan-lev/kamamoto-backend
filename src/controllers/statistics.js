const Exhibition = require("../models/exhibition");
const Exhibit = require("../models/exhibit");
const Category = require("../models/category");
const Partners = require("../models/partner");

module.exports.getExhibitionsCount = (req, res, next) => {
  Promise.all([
    Exhibit.estimatedDocumentCount(),
    Exhibition.estimatedDocumentCount(),
    Category.estimatedDocumentCount(),
    Partners.estimatedDocumentCount(),
  ])
    .then((results) => {
      const [exhibits, exhibitions, categories, partners] = results;
      res.send({ exhibits, exhibitions, categories, partners });
    })
    .catch((error) => next(error));
};
