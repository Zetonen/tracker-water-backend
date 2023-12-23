import express from "express";
import waterTrackControllers from "../../water-track-controllers.js";

import {
  authenticate,
  isEmptyBody,
  isValidId,
} from "../../middlewares/index.js";
import { validateBody } from "../../decorators/index.js";
import waterTrackControllers from "../../controllers/water-track-controllers.js";
import {
  addWaterSchema,
  updateWaterSchema,
} from "../../schema/water-tracks-schema.js";
const waterTrackRouter = express.Router();

waterTrackRouter.use(authenticate);

waterTrackRouter.post(
  "/",
  isEmptyBody,
  validateBody(addWaterSchema),
  waterTrackControllers.addWater
);

waterTrackRouter.put(
  "/:waterId",
  isValidId,
  isEmptyBody,
  validateBody(updateWaterSchema),
  waterTrackControllers.updateWaterById
);

export default waterTrackRouter;
