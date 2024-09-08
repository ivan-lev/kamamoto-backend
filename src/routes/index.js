const routes = require("express").Router();

const { signInValidator } = require("../middlewares/validators/userValidator");
const { login } = require("../controllers/users");
const auth = require("../middlewares/auth");

const userRouter = require("./users");
const categoriesRouter = require("./categories");
const statisticsRouter = require("./statistics");
const exhibitRouter = require("./exhibits");
const exhibitionRouter = require("./exhibitons");
const partnerRouter = require("./partners");

const { NotFoundError } = require("../errors");
const { ERROR_MESSAGES } = require("../constants");

routes.post("/signin", signInValidator, login);

routes.use(auth); // pass all get requests except of user token checking

routes.use("/users", userRouter);
routes.use("/exhibits", exhibitRouter);
routes.use("/exhibitions", exhibitionRouter);
routes.use("/categories", categoriesRouter);
routes.use("/statistics", statisticsRouter);
routes.use("/partners", partnerRouter);

routes.all("*", (req, res, next) =>
  next(new NotFoundError(ERROR_MESSAGES.PAGE_NOT_FOUND))
);

module.exports = { routes };
