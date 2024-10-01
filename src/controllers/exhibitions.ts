import { type Request, type Response, type NextFunction } from 'express'

import Exhibition from '../models/exhibition'

import type { Exhibition as ExhibitionType } from '../types/exhibition'

import { NotFoundError } from '../errors/not-found-error'
import { ValidationError } from '../errors/validation-error'
import { ConflictError } from '../errors/conflict-error'
import { ERROR_MESSAGES } from '../constants'

const getExhibitions = (req: Request, res: Response, next: NextFunction): void => {
  Exhibition.find({}, { _id: 0 })
    .then((exhibitions) => res.send(exhibitions))
    .catch((error) => { next(error) })
}

const createExhibition = (req: Request, res: Response, next: NextFunction): void => {
  const exhibition = req.body

  Exhibition.create({ ...exhibition })
    .then((exhibition) => res.status(201).send(exhibition))
    .catch((error) => {
      if (error.name === 'CastError') {
        next(new ValidationError(ERROR_MESSAGES.EXHIBITION_WRONG_ID)); return
      }

      if (error.name === 'ValidationError') {
        next(new ValidationError(ERROR_MESSAGES.EXHIBITION_WRONG_DATA)); return
      }

      if (error.code === 11000) {
        next(new ConflictError(ERROR_MESSAGES.EXHIBITION_EXISTS)); return
      }

      if (error.name === 'DocumentNotFoundError') {
        next(new NotFoundError(ERROR_MESSAGES.EXHIBITION_NOT_FOUND)); return
      }

      next(error)
    })
}

const getExhibitionById = (req: Request, res: Response, next: NextFunction): void => {
  Exhibition.findOne({ id: req.params.id }, { _id: 0 })
    .orFail()
    .then((exhibition) => {
      res.send(exhibition)
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

const updateExhibition = (req: Request, res: Response, next: NextFunction): void => {
  const newExhibitionData: ExhibitionType = req.body
  Exhibition.findOneAndUpdate({ id: req.params.id }, newExhibitionData, {
    new: true,
    runValidators: true,
    projection: { _id: 0 }
  })
    .orFail()
    .then((exhibition) => res.send(exhibition))
    .catch((error) => {
      if (error.name === 'DocumentNotFoundError') {
        next(new NotFoundError(ERROR_MESSAGES.EXHIBITION_NOT_FOUND)); return
      }

      if (error.name === 'ValidationError') {
        next(new ValidationError(ERROR_MESSAGES.EXHIBITION_WRONG_DATA)); return
      }

      if (error.name === 'CastError') {
        next(new NotFoundError(ERROR_MESSAGES.EXHIBITION_NOT_FOUND)); return
      }

      next(error)
    })
}

const deleteExhibition = (req: Request, res: Response, next: NextFunction): void => {
  Exhibition.findOneAndDelete({ id: req.params.id }, { _id: 0 })
    .orFail()
    .then((exhibition) => res.send(exhibition))
    .catch((error) => {
      if (error.name === 'CastError') {
        next(new ValidationError(ERROR_MESSAGES.EXHIBITION_WRONG_ID)); return
      }

      if (error.name === 'DocumentNotFoundError') {
        next(new NotFoundError(ERROR_MESSAGES.EXHIBITION_NOT_FOUND)); return
      }

      next(error)
    })
}

export const exhibition = {
  createExhibition,
  deleteExhibition,
  getExhibitions,
  getExhibitionById,
  updateExhibition
}
