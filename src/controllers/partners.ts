import { Request, Response, NextFunction } from "express";
import Partner from "../models/partner";
import { ERROR_MESSAGES } from "../constants";

import { NotFoundError } from "../errors/not-found-error";
import { ValidationError } from "../errors/validation-error";
import { ConflictError } from "../errors/conflict-error";

const getPartners = (req: Request, res: Response, next: NextFunction) => {
  Partner.find({})
    .then((partners) => res.send(partners))
    .catch((error) => next(error));
};

const createPartner = (req: Request, res: Response, next: NextFunction) => {
  const partner = req.body;

  Partner.create({ ...partner })
    .then((partner) => res.status(201).send(partner))
    .catch((error) => {
      if (error.name === "CastError") {
        return next(new ValidationError(ERROR_MESSAGES.EXHIBITION_WRONG_ID));
      }

      if (error.name === "ValidationError") {
        return next(new ValidationError(ERROR_MESSAGES.EXHIBITION_WRONG_DATA));
      }

      if (error.code === 11000) {
        return next(new ConflictError(ERROR_MESSAGES.EXHIBITION_EXISTS));
      }

      if (error.name === "DocumentNotFoundError") {
        return next(new NotFoundError(ERROR_MESSAGES.EXHIBITION_NOT_FOUND));
      }

      return next(error);
    });
};

const getPartnerById = (req: Request, res: Response, next: NextFunction) => {
  Partner.findOne({ _id: req.params._id })
    .orFail()
    .then((partner) => {
      res.send(partner);
    })
    .catch((error) => {
      if (error.name === "CastError") {
        return next(new ValidationError(ERROR_MESSAGES.EXHIBIT_WRONG_ID));
      }

      if (error.name === "DocumentNotFoundError") {
        return next(new NotFoundError(ERROR_MESSAGES.EXHIBIT_NOT_FOUND));
      }

      return next(error);
    });
};

const updatePartner = (req: Request, res: Response, next: NextFunction) => {
  Partner.findOneAndUpdate({ _id: req.params._id }, req.body, {
    new: true,
    runValidators: true,
  })
    .orFail()
    .then((partner) => res.send(partner))
    .catch((error) => {
      if (error.name === "DocumentNotFoundError") {
        return next(new NotFoundError(ERROR_MESSAGES.PARTNER_NOT_FOUND));
      }

      if (error.name === "ValidationError") {
        return next(new ValidationError(ERROR_MESSAGES.PARTNER_WRONG_DATA));
      }

      if (error.name === "CastError") {
        return next(new NotFoundError(ERROR_MESSAGES.PARTNER_NOT_FOUND));
      }

      return next(error);
    });
};

const deletePartner = (req: Request, res: Response, next: NextFunction) => {
  Partner.findOneAndDelete({ _id: req.params._id })
    .orFail()
    .select("_id")
    .then((partner) => res.send(partner))
    .catch((error) => {
      if (error.name === "CastError") {
        return next(new ValidationError(ERROR_MESSAGES.EXHIBITION_WRONG_ID));
      }

      if (error.name === "DocumentNotFoundError") {
        return next(new NotFoundError(ERROR_MESSAGES.EXHIBITION_NOT_FOUND));
      }

      return next(error);
    });
};

export const partners = {
  createPartner,
  deletePartner,
  getPartnerById,
  getPartners,
  updatePartner,
};
