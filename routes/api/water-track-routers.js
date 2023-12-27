import express from "express";

import {
 authenticate,
 isEmptyBody,
 isValidId,
} from "../../middlewares/index.js";
import { validateBody } from "../../decorators/index.js";
import waterTrackControllers from "../../controllers/water-track-controllers.js";
import {
 addWaterSchema,
 getWaterInfoForMonthSchema,
 getWaterInfoForMTodaySchema,
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

waterTrackRouter.delete(
 "/:waterId",
 isValidId,
 waterTrackControllers.deleteWaterById
);

waterTrackRouter.get(
 "/month",
 isEmptyBody,
 validateBody(getWaterInfoForMonthSchema),
 waterTrackControllers.getWaterInfoForMonth
);
waterTrackRouter.get(
 "/today",
 isEmptyBody,
 validateBody(getWaterInfoForMTodaySchema),
 waterTrackControllers.getWaterInfoForToday
);

export default waterTrackRouter;
