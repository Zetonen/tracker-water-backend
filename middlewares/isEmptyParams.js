import { HttpError } from "../helpers/index.js";

const isEmptyParams = (req, res, next) => {
 const queryKeys = Object.keys(req.query);

 if (!queryKeys.length) {
  return next(HttpError(400, "missing  params"));
 }
 next();
};

export default isEmptyParams;
