const router = require("express").Router();

const {
  getCategories,
  createCategory,
  deleteCategory,
  getCategoryExhibits,
  updateCategory,
} = require("../controllers/categories");

const {
  categoryValidator,
  categoryDeleteValidator,
} = require("../middlewares/validators/categoryValidator");

router.get("/", getCategories);
router.post("/", categoryValidator, createCategory);
router.patch("/:category", updateCategory);
router.get("/:category", getCategoryExhibits);
router.delete("/:category", categoryDeleteValidator, deleteCategory);

module.exports = router;
