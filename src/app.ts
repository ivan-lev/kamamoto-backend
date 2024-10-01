import 'dotenv/config'

import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import bodyParser from 'body-parser'
import helmet from 'helmet'

import limiter from './middlewares/limiter'
import { requestLogger, errorLogger } from './middlewares/logger'
import { errors } from 'celebrate'
import { errorHandler } from './middlewares/error-handler'
import routes from './routes'

import { PORT, DB_URL } from './config'

const app = express()

mongoose.connect(DB_URL).catch((error: any) => { console.log(error) })

app.use(limiter) // limit requests count
app.use(cors()) // cross-domain settings
app.use(requestLogger) // winston requests logger
app.use(helmet()) // protect headers
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(routes) // all routes goes through here

app.use(errorLogger) // winston error logger
app.use(errors()) // celebrate error handler
app.use(errorHandler) // final error handler

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`)
  console.log(`DB path is ${DB_URL}`)
})
