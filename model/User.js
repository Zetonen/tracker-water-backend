import { Schema, model } from "mongoose";

import { handleSaveError, preUpdate } from "./hook.js";
import { emailRegexp } from "../schema/user-schema.js";

const userSchema = new Schema(
  {
    username: {
      type: String,
      default: "V",
    },
    email: {
      type: String,
      match: emailRegexp,
      unique: true,
      require: true,
    },
    password: {
      type: String,
      minLength: 8,
      require: true,
    },
    token: {
      type: String,
      default: "",
    },
  },
  { versionKey: false }
);

userSchema.post("save", handleSaveError);
userSchema.pre("findOneAndUpdate", preUpdate);
userSchema.post("findOneAndUpdate", handleSaveError);

const User = model("user", userSchema);

export default User;
