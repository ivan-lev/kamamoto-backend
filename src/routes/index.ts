import { Router } from "express";
import { login } from "../controllers/users";
import { auth } from "../middlewares/auth";

import userRouter from "./users";
import categoryRouter from "./categories";
import statisticsRouter from "./statistics";
import exhibitionRouter from "./exhibitions";
import partnerRouter from "./partners";
const exhibitRouter = require("./exhibits");

const { signInValidator } = require("../middlewares/validators/userValidator");

const { NotFoundError } = require("../errors");
const { ERROR_MESSAGES } = require("../constants");

const routes = Router();

routes.post("/signin", signInValidator, login);
routes.use(auth); // pass all get requests except of user token checking
routes.use("/users", userRouter);
routes.use("/exhibits", exhibitRouter);
routes.use("/exhibitions", exhibitionRouter);
routes.use("/categories", categoryRouter);
routes.use("/statistics", statisticsRouter);
routes.use("/partners", partnerRouter);
routes.all("*", (req, res, next) =>
  next(new NotFoundError(ERROR_MESSAGES.PAGE_NOT_FOUND))
);

module.exports = { routes };
