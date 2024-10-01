import { Router } from 'express'
import { login } from '../controllers/users'
import { auth } from '../middlewares/auth'

import userRouter from './users'
import categoryRouter from './categories'
import statisticsRouter from './statistics'
import exhibitionRouter from './exhibitions'
import partnerRouter from './partners'
import exhibitRouter from './exhibits'

import { signInValidator } from '../middlewares/validators/userValidator'
import { NotFoundError } from '../errors/not-found-error'
import { ERROR_MESSAGES } from '../constants'

const routes = Router()

routes.post('/signin', signInValidator, login)
routes.use(auth) // pass all get requests except of user token checking
routes.use('/users', userRouter)
routes.use('/exhibits', exhibitRouter)
routes.use('/exhibitions', exhibitionRouter)
routes.use('/categories', categoryRouter)
routes.use('/statistics', statisticsRouter)
routes.use('/partners', partnerRouter)
routes.all('*', (req, res, next) => { next(new NotFoundError(ERROR_MESSAGES.PAGE_NOT_FOUND)) }
)

export default routes
