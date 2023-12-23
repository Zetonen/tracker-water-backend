import { ctrlWrapper } from "../decorators/index.js";
import * as waterTrackService from "./waterTrack/index.js";
// import * as waterTrackService from "./waterTrack/index.js";

export default {
  addWater: ctrlWrapper(waterTrackService.addWater),
  updateWaterById: ctrlWrapper(waterTrackService.updateWaterById),
  deleteWaterById: ctrlWrapper(waterTrackService.deleteWaterById)

};
