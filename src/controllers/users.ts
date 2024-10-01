import jwt from 'jsonwebtoken'
import { JWT_SECRET, NODE_ENV } from '../config'

import User from '../models/user'

import { type Request, type Response, type NextFunction } from 'express'

import { NotFoundError } from '../errors/not-found-error'
import { ValidationError } from '../errors/validation-error'
import { ERROR_MESSAGES } from '../constants'

export const login = (req: Request, res: Response, next: NextFunction): void => {
  const { email, password } = req.body

  return User.findUserByCredentials(email as string, password as string)
    .then((user: any) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'secret-key',
        { expiresIn: '7d' }
      )
      res.send({ token })
    })
    .catch((error: any) => { next(error) })
}

export const checkToken = (req: any, res: Response, next: NextFunction): void => {
  const currentUserId = req.user._id

  User.findById(currentUserId, {
    _id: 1,
    email: 1,
    name: 1
  })
    .orFail()
    .then((user) => res.send({ answer: 'Token checked!' }))
    .catch((error) => {
      if (error.name === 'CastError') {
        next(new ValidationError(ERROR_MESSAGES.USER_WRONG_ID)); return
      }

      if (error.name === 'DocumentNotFoundError') {
        next(new NotFoundError(ERROR_MESSAGES.USER_NOT_FOUND)); return
      }

      next(error)
    })
}
