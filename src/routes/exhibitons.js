const router = require("express").Router();

const {
  getExhibitions,
  createExhibition,
} = require("../controllers/exhibitions");

const { exhibitionValidator } = require("../middlewares/exhibitionValidator");

router.get("/", getExhibitions);
router.post("/", exhibitionValidator, createExhibition);

module.exports = router;
