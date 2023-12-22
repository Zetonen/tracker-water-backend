import { ctrlWrapper } from "../decorators/index.js";
import * as usersService from "./users/index.js";

export default {
  signup: ctrlWrapper(usersService.signup),
  signin: ctrlWrapper(usersService.signin),
};
