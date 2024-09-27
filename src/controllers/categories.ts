import { Request, Response, NextFunction } from "express";
import Category from "../models/category";
import Exhibit from "../models/exhibit";
import type { Exhibit as ExhibitType } from "../types/exhibit";
import { ERROR_MESSAGES } from "../constants";

import { NotFoundError } from "../errors/not-found-error";
import { ValidationError } from "../errors/validation-error";
import { ConflictError } from "../errors/conflict-error";

const getCategories = (req: Request, res: Response, next: NextFunction) => {
  Category.find({}, "-_id")
    .then((categories) => res.send(categories))
    .catch((error) => next(error));
};

const getCategoryExhibits = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  Category.findOne({ category: req.params.category })
    .orFail()
    .then((category) => {
      console.log(category._id.toString());
      Exhibit.find({ exhibitCategory: category._id })
        .then((exhibits: ExhibitType[]) => res.send(exhibits))
        .catch((error: any) => {
          return next(error);
        });
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

const createCategory = (req: Request, res: Response, next: NextFunction) => {
  const category = req.body;

  Category.create({ ...category })
    .then((exhibit) => res.status(201).send(exhibit))
    .catch((error) => {
      if (error.name === "CastError") {
        return next(new ValidationError(ERROR_MESSAGES.CATEGORY_WRONG_ID));
      }

      if (error.name === "ValidationError") {
        return next(new ValidationError(ERROR_MESSAGES.CATEGORY_WRONG_DATA));
      }

      if (error.code === 11000) {
        return next(new ConflictError(ERROR_MESSAGES.CATEGORY_EXISTS));
      }

      return next(error);
    });
};

const deleteCategory = (req: Request, res: Response, next: NextFunction) => {
  Category.findOneAndDelete({ category: req.params.category })
    .orFail()
    .select("category")
    .then((category) => res.send(category))
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

const updateCategory = (req: Request, res: Response, next: NextFunction) => {
  Category.findOneAndUpdate({ category: req.params.category }, req.body, {
    new: true,
    runValidators: true,
  })
    .orFail()
    .then((exhibit) => res.send(exhibit))
    .catch((error) => {
      if (error.name === "DocumentNotFoundError") {
        return next(new NotFoundError(ERROR_MESSAGES.CATEGORY_NOT_FOUND));
      }

      if (error.name === "ValidationError") {
        return next(new ValidationError(ERROR_MESSAGES.CATEGORY_WRONG_DATA));
      }

      if (error.name === "CastError") {
        return next(new NotFoundError(ERROR_MESSAGES.CATEGORY_NOT_FOUND));
      }

      if (error.code === 11000) {
        return next(new ConflictError(ERROR_MESSAGES.CATEGORY_EXISTS));
      }

      return next(error);
    });
};

export const category = {
  createCategory,
  deleteCategory,
  getCategories,
  getCategoryExhibits,
  updateCategory,
};
