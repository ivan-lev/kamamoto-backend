// const router = require("express").Router();

import { Router } from "express";
const statisticsRouter = Router();

// const { getExhibitionsCount } = require("../controllers/statistics");
import { getStatistics } from "../controllers/statistics";

statisticsRouter.get("/", getStatistics);

export default statisticsRouter;
