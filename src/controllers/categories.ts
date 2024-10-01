import { type Request, type Response, type NextFunction } from 'express'

import Category from '../models/category'
import Exhibit from '../models/exhibit'

import type { Exhibit as ExhibitType } from '../types/exhibit'
import type { Category as CategoryType } from '../types/category'

import { NotFoundError } from '../errors/not-found-error'
import { ValidationError } from '../errors/validation-error'
import { ConflictError } from '../errors/conflict-error'
import { ERROR_MESSAGES } from '../constants'

const getCategories = (req: Request, res: Response, next: NextFunction): void => {
  Category.find({}, '-_id')
    .then((categories) => res.send(categories))
    .catch((error) => { next(error) })
}

const getCategoryExhibits = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  Category.findOne({ category: req.params.category })
    .orFail()
    .then((category) => {
      console.log(category._id.toString())
      Exhibit.find({ exhibitCategory: category._id })
        .then((exhibits: ExhibitType[]) => res.send(exhibits))
        .catch((error: any) => {
          next(error)
        })
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        next(new ValidationError(ERROR_MESSAGES.EXHIBIT_WRONG_ID)); return
      }

      if (error.name === 'DocumentNotFoundError') {
        next(new NotFoundError(ERROR_MESSAGES.EXHIBIT_NOT_FOUND)); return
      }

      next(error)
    })
}

const createCategory = (req: Request, res: Response, next: NextFunction): void => {
  const category = req.body

  Category.create({ ...category })
    .then((exhibit) => res.status(201).send(exhibit))
    .catch((error) => {
      if (error.name === 'CastError') {
        next(new ValidationError(ERROR_MESSAGES.CATEGORY_WRONG_ID)); return
      }

      if (error.name === 'ValidationError') {
        next(new ValidationError(ERROR_MESSAGES.CATEGORY_WRONG_DATA)); return
      }

      if (error.code === 11000) {
        next(new ConflictError(ERROR_MESSAGES.CATEGORY_EXISTS)); return
      }

      next(error)
    })
}

const deleteCategory = (req: Request, res: Response, next: NextFunction): void => {
  Category.findOneAndDelete({ category: req.params.category })
    .orFail()
    .select('category')
    .then((category) => res.send(category))
    .catch((error) => {
      if (error.name === 'CastError') {
        next(new ValidationError(ERROR_MESSAGES.EXHIBIT_WRONG_ID)); return
      }

      if (error.name === 'DocumentNotFoundError') {
        next(new NotFoundError(ERROR_MESSAGES.EXHIBIT_NOT_FOUND)); return
      }

      next(error)
    })
}

const updateCategory = (req: Request, res: Response, next: NextFunction): void => {
  const newCategoryData: CategoryType = req.body
  Category.findOneAndUpdate({ category: req.params.category }, newCategoryData, {
    new: true,
    runValidators: true
  })
    .orFail()
    .then((exhibit) => res.send(exhibit))
    .catch((error) => {
      if (error.name === 'DocumentNotFoundError') {
        next(new NotFoundError(ERROR_MESSAGES.CATEGORY_NOT_FOUND)); return
      }

      if (error.name === 'ValidationError') {
        next(new ValidationError(ERROR_MESSAGES.CATEGORY_WRONG_DATA)); return
      }

      if (error.name === 'CastError') {
        next(new NotFoundError(ERROR_MESSAGES.CATEGORY_NOT_FOUND)); return
      }

      if (error.code === 11000) {
        next(new ConflictError(ERROR_MESSAGES.CATEGORY_EXISTS)); return
      }

      next(error)
    })
}

export const category = {
  createCategory,
  deleteCategory,
  getCategories,
  getCategoryExhibits,
  updateCategory
}
