const router = require("express").Router();

const {
  getPartners,
  createPartner,
  updatePartner,
} = require("../controllers/partners");

const {
  partnerValidator,
} = require("../middlewares/validators/partnerValidator");

router.get("/", getPartners);
router.post("/", partnerValidator, createPartner);
router.patch("/:id", partnerValidator, updatePartner);
// router.delete("/:id", exhibitionIdValidator, deleteExhibition);

module.exports = router;
