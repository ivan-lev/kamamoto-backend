import { JWT_SECRET, NODE_ENV } from '../config'
import { type Response, type NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { ERROR_MESSAGES } from '../constants'
import { AuthorizationError } from '../errors/authorization-error'

export const auth = (req: any, res: Response, next: NextFunction): void => {
  const { authorization }: { authorization: string } = req.headers

  // pass next all get requests if it is not user login checking
  if (req.method === 'GET' && req.originalUrl !== '/users/') {
    next(); return
  }

  if (!authorization?.startsWith('Bearer ')) {
    next(new AuthorizationError(ERROR_MESSAGES.UNAUTHORIZED)); return
  }

  const token: string = authorization.replace('Bearer ', '')
  let payload

  try {
    payload = jwt.verify(
      token,
      NODE_ENV === 'production' ? JWT_SECRET : 'secret-key'
    )
  } catch (err) {
    next(new AuthorizationError(ERROR_MESSAGES.UNAUTHORIZED)); return
  }

  req.user = payload
  next()
}
