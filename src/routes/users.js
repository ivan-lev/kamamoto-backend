const router = require("express").Router();

const { checkToken } = require("../controllers/users");

router.get("/", checkToken);

module.exports = router;
