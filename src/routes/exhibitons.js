const router = require("express").Router();

const {
  getExhibitions,
  createExhibition,
  updateExhibition,
  deleteExhibition,
} = require("../controllers/exhibitions");

const {
  exhibitionValidator,
  exhibitionIdValidator,
} = require("../middlewares/exhibitionValidator");

router.get("/", getExhibitions);
router.post("/", exhibitionValidator, createExhibition);
router.patch("/:id", exhibitionValidator, updateExhibition);
router.delete("/:id", exhibitionIdValidator, deleteExhibition);

module.exports = router;
