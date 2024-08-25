const routes = require("express").Router();

const {
  validateJoiSignup,
  validateJoiSignin,
} = require("../middlewares/joi-users-validation");
const { createUser, login } = require("../controllers/users");
const auth = require("../middlewares/auth");
const userRouter = require("./users");
const collectionRouter = require("./collection");

const exhibitRouter = require("./exhibits");
const exhibitionRouter = require("./exhibitons");

const { NotFoundError } = require("../errors");
const { ERROR_MESSAGES } = require("../constants");

routes.post("/signup", validateJoiSignup, createUser);
routes.post("/signin", validateJoiSignin, login);

routes.use(auth);

routes.use("/exhibits", exhibitRouter);
routes.use("/exhibitions", exhibitionRouter);
routes.use("/users", userRouter);
routes.use("/collection", collectionRouter);

routes.all("*", (req, res, next) =>
  next(new NotFoundError(ERROR_MESSAGES.PAGE_NOT_FOUND))
);

module.exports = { routes };
