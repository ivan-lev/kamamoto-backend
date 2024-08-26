const router = require("express").Router();

const { getExhibitionsCount } = require("../controllers/statistics");

router.get("/", getExhibitionsCount);

module.exports = router;
