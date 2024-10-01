import Exhibit from '../models/exhibit'
import Exhibition from '../models/exhibition'
import Category from '../models/category'
import Partners from '../models/partner'

import { type Request, type Response, type NextFunction } from 'express'

export const getStatistics = (req: Request, res: Response, next: NextFunction): void => {
  Promise.all([
    Exhibit.estimatedDocumentCount(),
    Exhibition.estimatedDocumentCount(),
    Category.estimatedDocumentCount(),
    Partners.estimatedDocumentCount()
  ])
    .then((results) => {
      const [exhibits, exhibitions, categories, partners] = results
      res.send({ exhibits, exhibitions, categories, partners })
    })
    .catch((error) => { next(error) })
}
