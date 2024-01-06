import express from "express";
import usersService from "../../controllers/user-controllers.js";
import { validateBody } from "../../decorators/index.js";
import {
  isEmptyBody,
  authenticate,
  uploadAvatar,
} from "../../middlewares/index.js";
import {
  userSigninSchema,
  userSignupSchema,
  changeUserSchema,
  userAvatarsSchema,
  userWaterRateSchema,
  userForgotPasswordSchema,
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

usersRouter.post(
  "/forgotPassword",
  isEmptyBody,
  validateBody(userForgotPasswordSchema),
  usersService.forgotPassword
);

usersRouter.get("/verify/:verificationCode", usersService.verify);
usersRouter.post(
  "/updatePassword/:verificationCode",
  usersService.updatePassword
);

usersRouter.get("/getInfo", authenticate, usersService.getInfo);

usersRouter.patch(
  "/changeInfo",
  authenticate,
  isEmptyBody,
  validateBody(changeUserSchema),
  usersService.changeInfo
);

usersRouter.patch(
  "/updateAvatar",
  authenticate,
  uploadAvatar.single("avatar"),
  validateBody(userAvatarsSchema),
  usersService.updateAvatar
);

usersRouter.patch(
  "/water-rate",
  authenticate,
  validateBody(userWaterRateSchema),
  usersService.updateWaterRate
);

export default usersRouter;
