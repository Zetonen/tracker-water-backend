import express from "express";
import usersService from "../../controllers/user-controllers.js";
import validaterBody from "../../decorators/validateBody.js";
import { isEmptyBody } from "../../middlewares/index.js";
import {
  userSigninSchema,
  userSignupSchema,
} from "../../schema/user-schema.js";

const usersRouter = express.Router();

usersRouter.post(
  "/signup",
  isEmptyBody,
  validaterBody(userSignupSchema),
  usersService.signup
);

usersRouter.post(
  "/signin",
  isEmptyBody,
  validaterBody(userSigninSchema),
  usersService.signin
);

export default usersRouter;
