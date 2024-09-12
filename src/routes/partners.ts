import { Router } from "express";
import { partners } from "../controllers/partners";

const partnerRouter = Router();

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
