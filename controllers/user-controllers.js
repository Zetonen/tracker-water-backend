import { ctrlWrapper } from "../decorators/index.js";
import * as usersService from "./users/index.js";

export default {
  signup: ctrlWrapper(usersService.signup),
  signin: ctrlWrapper(usersService.signin),
  logout: ctrlWrapper(usersService.logout),
  forgotPassword: ctrlWrapper(usersService.forgotPassword),
  getInfo: ctrlWrapper(usersService.getInfo),
  changeInfo: ctrlWrapper(usersService.changeInfo),
  updateAvatar: ctrlWrapper(usersService.updateAvatar),
  updateWaterRate: ctrlWrapper(usersService.updateWaterRate),
};
