import { Request, Response, NextFunction } from "express";
import Exhibition from "../models/exhibition";
import { ERROR_MESSAGES } from "../constants";

import { NotFoundError } from "../errors/not-found-error";
import { ValidationError } from "../errors/validation-error";
import { ConflictError } from "../errors/conflict-error";

const getExhibitions = (req: Request, res: Response, next: NextFunction) => {
  Exhibition.find({}, { _id: 0 })
    .then((exhibitions) => res.send(exhibitions))
    .catch((error) => next(error));
};

const createExhibition = (req: Request, res: Response, next: NextFunction) => {
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

const getExhibitionById = (req: Request, res: Response, next: NextFunction) => {
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

const updateExhibition = (req: Request, res: Response, next: NextFunction) => {
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

const deleteExhibition = (req: Request, res: Response, next: NextFunction) => {
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

export const exhibition = {
  createExhibition,
  deleteExhibition,
  getExhibitions,
  getExhibitionById,
  updateExhibition,
};
