import express from "express";
import usersService from "../../controllers/user-controllers.js";
import { validateBody } from "../../decorators/index.js";
import { isEmptyBody, authenticate } from "../../middlewares/index.js";
import {
  userSigninSchema,
  userSignupSchema,
} from "../../schema/user-schema.js";

const usersRouter = express.Router();

usersRouter.post(
  "/signup",
  isEmptyBody,
  validateBody(userSignupSchema),
  usersService.signup
);

usersRouter.post(
  "/signin",
  isEmptyBody,
  validateBody(userSigninSchema),
  usersService.signin
);

usersRouter.post("/logout", authenticate, usersService.logout);

usersRouter.get("/getInfo", authenticate, usersService.getInfo);

usersRouter.put(
  "/changeInfo",
  authenticate,
  isEmptyBody,
  usersService.changeInfo
);

export default usersRouter;
