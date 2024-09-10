import { Router } from "express";
const categoryRouter = Router();

import { category } from "../controllers/categories";

// const {
//   getCategories,
//   createCategory,
//   deleteCategory,
//   getCategoryExhibits,
//   updateCategory,
// } = require("../controllers/categories");

const {
  categoryValidator,
  categoryDeleteValidator,
} = require("../middlewares/validators/categoryValidator");

categoryRouter.get("/", category.getCategories);
categoryRouter.post("/", categoryValidator, category.createCategory);
categoryRouter.patch("/:category", category.updateCategory);
categoryRouter.get("/:category", category.getCategoryExhibits);
categoryRouter.delete(
  "/:category",
  categoryDeleteValidator,
  category.deleteCategory
);

export default categoryRouter;
