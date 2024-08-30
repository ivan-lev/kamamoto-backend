const router = require("express").Router();

const {
  getPartners,
  createPartner,
  updatePartner,
  deletePartner,
} = require("../controllers/partners");

const {
  partnerCreateValidator,
  partnerUpdateValidator,
  partnerIdValidator,
} = require("../middlewares/validators/partnerValidator");

router.get("/", getPartners);
router.post("/", partnerCreateValidator, createPartner);
router.patch("/:_id", partnerUpdateValidator, updatePartner);
router.delete("/:_id", partnerIdValidator, deletePartner);

module.exports = router;
