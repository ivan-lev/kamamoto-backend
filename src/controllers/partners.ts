import { type Request, type Response, type NextFunction } from 'express'

import Partner from '../models/partner'

import type { Partner as PartnerType } from '../types/partner'

import { NotFoundError } from '../errors/not-found-error'
import { ValidationError } from '../errors/validation-error'
import { ConflictError } from '../errors/conflict-error'
import { ERROR_MESSAGES } from '../constants'

const getPartners = (req: Request, res: Response, next: NextFunction): void => {
  Partner.find({})
    .then((partners) => res.send(partners))
    .catch((error) => { next(error) })
}

const createPartner = (req: Request, res: Response, next: NextFunction): void => {
  const partner = req.body

  Partner.create({ ...partner })
    .then((partner) => res.status(201).send(partner))
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

const getPartnerById = (req: Request, res: Response, next: NextFunction): void => {
  Partner.findOne({ _id: req.params._id })
    .orFail()
    .then((partner) => {
      res.send(partner)
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

const updatePartner = (req: Request, res: Response, next: NextFunction): void => {
  const newPartnerData: PartnerType = req.body
  Partner.findOneAndUpdate({ _id: req.params._id }, newPartnerData, {
    new: true,
    runValidators: true
  })
    .orFail()
    .then((partner) => res.send(partner))
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

const deletePartner = (req: Request, res: Response, next: NextFunction): void => {
  Partner.findOneAndDelete({ _id: req.params._id })
    .orFail()
    .select('_id')
    .then((partner) => res.send(partner))
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

export const partners = {
  createPartner,
  deletePartner,
  getPartnerById,
  getPartners,
  updatePartner
}
