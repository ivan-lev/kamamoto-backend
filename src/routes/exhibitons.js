const router = require("express").Router();

const {
  getExhibitions,
  getExhibitionById,
  createExhibition,
  updateExhibition,
  deleteExhibition,
} = require("../controllers/exhibitions");

const {
  exhibitionValidator,
  exhibitionIdValidator,
} = require("../middlewares/validators/exhibitionValidator");

router.get("/", getExhibitions);
router.post("/", exhibitionValidator, createExhibition);
router.get("/:id", exhibitionIdValidator, getExhibitionById);
router.patch("/:id", exhibitionValidator, updateExhibition);
router.delete("/:id", exhibitionIdValidator, deleteExhibition);

module.exports = router;
