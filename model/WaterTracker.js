import { Schema, model } from "mongoose";
import { handleSaveError, preUpdate } from "./hook.js";

const waterTrackersSchema = new Schema(
  {
    amountWater: {
      type: Number,
      required: [true, "Set amount of water"],
    },
    date: {
      type: String,
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  {
    versionKey: false,
  }
);

waterTrackersSchema.post("save", handleSaveError);
waterTrackersSchema.pre("findOneAndUpdate", preUpdate);
waterTrackersSchema.post("findOneAndUpdate", handleSaveError);

const WaterTrack = model("water-track", waterTrackersSchema);
export default WaterTrack;
