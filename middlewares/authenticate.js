import jwt from "jsonwebtoken";
import "dotenv/config.js";
import { HttpError } from "../helpers/index.js";
import ctrlWrapper from "../decorators/ctrlWrapper.js";

const { JWT_SECRET } = process.env;

const authenticate = async (req, res, next) => {
 
};
export default ctrlWrapper(authenticate);
