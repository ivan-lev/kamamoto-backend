// const router = require("express").Router();

import { Router } from "express";
const partnerRouter = Router();

// const {
//   getPartners,
//   createPartner,
//   updatePartner,
//   deletePartner,
// } = require("../controllers/partners");

import { partners } from "../controllers/partners";

const {
  partnerCreateValidator,
  partnerUpdateValidator,
  partnerIdValidator,
} = require("../middlewares/validators/partnerValidator");

partnerRouter.get("/", partners.getPartners);
partnerRouter.post("/", partnerCreateValidator, partners.createPartner);
partnerRouter.patch("/:_id", partnerUpdateValidator, partners.updatePartner);
partnerRouter.delete("/:_id", partnerIdValidator, partners.deletePartner);

export default partnerRouter;
