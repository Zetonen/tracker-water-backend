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
      required: [true, "The email is required!"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "The password is required!"],
      minLength: 8,
    },
    token: {
      type: String,
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleSaveError);
userSchema.pre("findOneAndUpdate", preUpdate);
userSchema.post("findOneAndUpdate", handleSaveError);

const User = model("user", userSchema);

export default User;
