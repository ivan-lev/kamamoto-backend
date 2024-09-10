// const router = require("express").Router();

import { Router } from "express";
import { exhibition } from "../controllers/exhibitions";

const exhibitionRouter = Router();

// const {
//   getExhibitions,
//   getExhibitionById,
//   createExhibition,
//   updateExhibition,
//   deleteExhibition,
// } = require("../controllers/exhibitions");

const {
  exhibitionValidator,
  exhibitionIdValidator,
} = require("../middlewares/validators/exhibitionValidator");

exhibitionRouter.get("/", exhibition.getExhibitions);
exhibitionRouter.post("/", exhibitionValidator, exhibition.createExhibition);
exhibitionRouter.get(
  "/:id",
  exhibitionIdValidator,
  exhibition.getExhibitionById
);
exhibitionRouter.patch(
  "/:id",
  exhibitionValidator,
  exhibition.updateExhibition
);
exhibitionRouter.delete(
  "/:id",
  exhibitionIdValidator,
  exhibition.deleteExhibition
);

// module.exports = router;
export default exhibitionRouter;
