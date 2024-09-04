const router = require("express").Router();

const {
  getCategories,
  createCategory,
  getCategoryExhibits,
} = require("../controllers/categories");

const {
  categoryValidator,
} = require("../middlewares/validators/categoryValidator");

router.get("/", getCategories);
router.post("/", createCategory);
router.get("/:category", getCategoryExhibits);
// router.post("/", exhibitValidator, createExhibit);
// router.get("/:exhibitId", exhibitIdValidator, findExhibitById);
// router.delete("/:exhibitId", exhibitIdValidator, deleteExhibit);
// router.patch("/:exhibitId", exhibitValidator, updateExhibit);

module.exports = router;
