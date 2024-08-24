const router = require("express").Router();

const {
  getExhibits,
  createExhibit,
  findExhibitById,
  deleteExhibit,
  updateExhibit,
} = require("../controllers/exhibits");

const {
  exhibitValidator,
  exhibitIdValidator,
} = require("../middlewares/exhibitValidator");

router.get("/", getExhibits);
router.post("/", exhibitValidator, createExhibit);
router.get("/:id", exhibitIdValidator, findExhibitById);
router.delete("/:id", exhibitIdValidator, deleteExhibit);
router.patch("/:id", exhibitValidator, updateExhibit);

module.exports = router;
