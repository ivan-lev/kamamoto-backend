import { type Request, type Response, type NextFunction } from 'express'

import Exhibit from '../models/exhibit'

import type { Exhibit as ExhibitType } from '../types/exhibit'

import { NotFoundError } from '../errors/not-found-error'
import { ValidationError } from '../errors/validation-error'
import { ConflictError } from '../errors/conflict-error'
import { ERROR_MESSAGES } from '../constants'

const getExhibits = (req: Request, res: Response, next: NextFunction): void => {
  Exhibit.find({})
    .populate({
      path: 'category',
      // Explicitly exclude `_id`
      select: 'title -_id'
    })
    .then((exhibits: ExhibitType[]) => res.send(exhibits))
    .catch((error: any) => { next(error) })
}

const findExhibitById = (req: Request, res: Response, next: NextFunction): void => {
  Exhibit.findOne({ id: req.params.id })
    .orFail()
    .then((exhibit: ExhibitType) => {
      console.log(exhibit)
      res.send(exhibit)
    })
    .catch((error: any) => {
      if (error.name === 'CastError') {
        next(new ValidationError(ERROR_MESSAGES.EXHIBIT_WRONG_ID)); return
      }

      if (error.name === 'DocumentNotFoundError') {
        next(new NotFoundError(ERROR_MESSAGES.EXHIBIT_NOT_FOUND)); return
      }

      next(error)
    })
}

const createExhibit = (req: Request, res: Response, next: NextFunction): void => {
  const exhibit = req.body

  Exhibit.create({ ...exhibit })
    .then((exhibit: ExhibitType) => res.status(201).send(exhibit))
    .catch((error: any) => {
      if (error.name === 'CastError') {
        next(new ValidationError(ERROR_MESSAGES.EXHIBIT_WRONG_ID)); return
      }

      if (error.name === 'ValidationError') {
        next(new ValidationError(ERROR_MESSAGES.EXHIBIT_WRONG_DATA)); return
      }

      if (error.code === 11000) {
        next(new ConflictError(ERROR_MESSAGES.EXHIBIT_EXISTS)); return
      }

      next(error)
    })
}

const deleteExhibit = (req: Request, res: Response, next: NextFunction): void => {
  Exhibit.findOneAndDelete({ is: req.params.is })
    .orFail()
    .then((exhibit: ExhibitType) => res.send(exhibit))
    .catch((error: any) => {
      if (error.name === 'CastError') {
        next(new ValidationError(ERROR_MESSAGES.EXHIBIT_WRONG_ID)); return
      }

      if (error.name === 'DocumentNotFoundError') {
        next(new NotFoundError(ERROR_MESSAGES.EXHIBIT_NOT_FOUND)); return
      }

      next(error)
    })
}

const updateExhibit = (req: Request, res: Response, next: NextFunction): void => {
  const newExhibitData: ExhibitType = req.body
  Exhibit.findOneAndUpdate({ is: req.params.is }, newExhibitData, {
    new: true,
    runValidators: true
  })
    .orFail()
    .then((exhibit: ExhibitType) => res.send(exhibit))
    .catch((error: any) => {
      if (error.name === 'DocumentNotFoundError') {
        next(new NotFoundError(ERROR_MESSAGES.EXHIBIT_NOT_FOUND)); return
      }

      if (error.name === 'ValidationError') {
        next(new ValidationError(ERROR_MESSAGES.EXHIBIT_WRONG_DATA)); return
      }

      if (error.name === 'CastError') {
        next(new NotFoundError(ERROR_MESSAGES.EXHIBIT_NOT_FOUND)); return
      }

      if (error.code === 11000) {
        next(new ConflictError(ERROR_MESSAGES.EXHIBIT_EXISTS)); return
      }

      next(error)
    })
}

export const exhibit = {
  getExhibits,
  findExhibitById,
  createExhibit,
  deleteExhibit,
  updateExhibit
}
