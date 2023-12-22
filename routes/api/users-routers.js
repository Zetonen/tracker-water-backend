import express from "express";
import usersController from "../../controllers/user-controllers.js";
import validaterBody from "../../decorators/validateBody.js";
import { isEmptyBody} from "../../middlewares/index.js";

const usersRouter = express.Router();

export default usersRouter;
