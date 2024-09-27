import { Router } from "express";
import { category } from "../controllers/categories";
import { categoryValidator, categoryDeleteValidator } from "../middlewares/validators/categoryValidator";

const categoryRouter = Router();

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
