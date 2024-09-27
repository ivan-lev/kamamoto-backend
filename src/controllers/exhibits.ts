const Exhibit = require('../models/exhibit');
const Category = require('../models/category');

import { Request, Response, NextFunction } from "express";

import { NotFoundError } from "../errors/not-found-error";
import { ValidationError } from "../errors/validation-error";
import { ConflictError } from "../errors/conflict-error";
import { Exhibit } from "../types/exhibit";

const { ERROR_MESSAGES } = require('../constants');

// module.exports.getExhibits = (req, res, next) => {
//   Exhibit.find({})
//     .then((exhibits) => res.send(exhibits))
//     .catch((error) => next(error));
// };

const getExhibits = (req: Request, res: Response, next: NextFunction) => {
  Exhibit.find({})
    .populate({
      path: 'category',
      // Explicitly exclude `_id`
      select: 'title -_id',
    })
    .then((exhibits: Exhibit[]) => res.send(exhibits))
    .catch((error: any) => next(error));
};

const findExhibitById = (req: Request, res: Response, next: NextFunction) => {
  Exhibit.findOne({ id: req.params.id })
    .orFail()
    .then((exhibit: Exhibit) => {
      console.log(exhibit);
      res.send(exhibit);
    })
    .catch((error: any) => {
      if (error.name === 'CastError') {
        return next(new ValidationError(ERROR_MESSAGES.EXHIBIT_WRONG_ID));
      }

      if (error.name === 'DocumentNotFoundError') {
        return next(new NotFoundError(ERROR_MESSAGES.EXHIBIT_NOT_FOUND));
      }

      return next(error);
    });
};

const createExhibit = (req: Request, res: Response, next: NextFunction) => {
  const exhibit = req.body;

  Exhibit.create({ ...exhibit })
    .then((exhibit: Exhibit) => res.status(201).send(exhibit))
    .catch((error: any) => {
      if (error.name === 'CastError') {
        return next(new ValidationError(ERROR_MESSAGES.EXHIBIT_WRONG_ID));
      }

      if (error.name === 'ValidationError') {
        return next(new ValidationError(ERROR_MESSAGES.EXHIBIT_WRONG_DATA));
      }

      if (error.code === 11000) {
        return next(new ConflictError(ERROR_MESSAGES.EXHIBIT_EXISTS));
      }

      return next(error);
    });
};

const deleteExhibit = (req: Request, res: Response, next: NextFunction) => {
  Exhibit.findOneAndDelete({ is: req.params.is })
    .orFail()
    .then((exhibit: Exhibit) => res.send(exhibit))
    .catch((error: any) => {
      if (error.name === 'CastError') {
        return next(new ValidationError(ERROR_MESSAGES.EXHIBIT_WRONG_ID));
      }

      if (error.name === 'DocumentNotFoundError') {
        return next(new NotFoundError(ERROR_MESSAGES.EXHIBIT_NOT_FOUND));
      }

      return next(error);
    });
};

const updateExhibit = (req: Request, res: Response, next: NextFunction) => {
  Exhibit.findOneAndUpdate({ is: req.params.is }, req.body, {
    new: true,
    runValidators: true,
  })
    .orFail()
    .then((exhibit: Exhibit) => res.send(exhibit))
    .catch((error: any) => {
      if (error.name === 'DocumentNotFoundError') {
        return next(new NotFoundError(ERROR_MESSAGES.EXHIBIT_NOT_FOUND));
      }

      if (error.name === 'ValidationError') {
        return next(new ValidationError(ERROR_MESSAGES.EXHIBIT_WRONG_DATA));
      }

      if (error.name === 'CastError') {
        return next(new NotFoundError(ERROR_MESSAGES.EXHIBIT_NOT_FOUND));
      }

      if (error.code === 11000) {
        return next(new ConflictError(ERROR_MESSAGES.EXHIBIT_EXISTS));
      }

      return next(error);
    });
};

export const exhibit = {getExhibits, findExhibitById, createExhibit, deleteExhibit, updateExhibit}