import { Request, Response, NextFunction } from "express";

import Exhibit from "../models/exhibit";
import Exhibition from "../models/exhibition";
import Category from "../models/category";
import Partners from "../models/partner";

export const getStatistics = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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
