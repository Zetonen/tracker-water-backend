import express from "express";
// import waterTrackControllers from "../../water-track-controllers.js";

import {
  authenticate,
  isEmptyBody,
  isValidId,
} from "../../middlewares/index.js";
import { validateBody } from "../../decorators/index.js";
const waterTrackRouter = express.Router();

// router.use(authenticate);

export default waterTrackRouter;
