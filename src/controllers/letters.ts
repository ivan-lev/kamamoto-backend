import 'dotenv/config'
import { type Request, type Response, type NextFunction } from 'express'

import Letter from '../models/letter'

import { type File } from '../types/file'

import { BASE_URL, PORT } from '../config'

import { NotFoundError } from '../errors/not-found-error'
import { ValidationError } from '../errors/validation-error'
import { ConflictError } from '../errors/conflict-error'
import { ERROR_MESSAGES, PATHS } from '../constants'

const getLetters = (req: Request, res: Response, next: NextFunction): void => {
  Letter.find({}, { _id: 0 })
    .then((letters: File[]) => {
      return letters.map(letter => {
        letter.name = `${BASE_URL}:${PORT}/${PATHS.LETTERS}/${letter.name}`
        letter.preview = `${BASE_URL}:${PORT}/${PATHS.LETTERS}/${letter.preview}`
        return letter
      })
    })
    .then((letters) => res.send(letters))
    .catch((error) => { next(error) })
}

const createLetter = (req: Request, res: Response, next: NextFunction): void => {
  const letter = req.body

  Letter.create({ ...letter })
    .then((letter) => res.status(201).send(letter))
    .catch((error) => {
      if (error.name === 'CastError') {
        next(new ValidationError(ERROR_MESSAGES.LETTER_WRONG_ID)); return
      }

      if (error.name === 'ValidationError') {
        next(new ValidationError(ERROR_MESSAGES.LETTER_WRONG_DATA)); return
      }

      if (error.code === 11000) {
        next(new ConflictError(ERROR_MESSAGES.LETTER_EXISTS)); return
      }

      if (error.name === 'DocumentNotFoundError') {
        next(new NotFoundError(ERROR_MESSAGES.LETTER_NOT_FOUND)); return
      }

      next(error)
    })
}

const updateLetter = (req: Request, res: Response, next: NextFunction): void => {
  const newLetterData: File = req.body
  Letter.findOneAndUpdate({ _id: req.params._id }, newLetterData, {
    new: true,
    runValidators: true
  })
    .orFail()
    .then((letter) => res.send(letter))
    .catch((error) => {
      if (error.name === 'DocumentNotFoundError') {
        next(new NotFoundError(ERROR_MESSAGES.PARTNER_NOT_FOUND)); return
      }

      if (error.name === 'ValidationError') {
        next(new ValidationError(ERROR_MESSAGES.PARTNER_WRONG_DATA)); return
      }

      if (error.name === 'CastError') {
        next(new NotFoundError(ERROR_MESSAGES.PARTNER_NOT_FOUND)); return
      }

      next(error)
    })
}

const deleteLetter = (req: Request, res: Response, next: NextFunction): void => {
  Letter.findOneAndDelete({ id: req.params.id })
    .orFail()
    .select('_id')
    .then((letter) => res.send(letter))
    .catch((error) => {
      if (error.name === 'CastError') {
        next(new ValidationError(ERROR_MESSAGES.LETTER_WRONG_ID)); return
      }

      if (error.name === 'DocumentNotFoundError') {
        next(new NotFoundError(ERROR_MESSAGES.LETTER_NOT_FOUND)); return
      }

      next(error)
    })
}

export const letters = {
  createLetter,
  deleteLetter,
  getLetters,
  updateLetter
}
