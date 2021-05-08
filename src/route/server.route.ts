import { Router } from "express";
import userRouter from "./user.route";

const serverRouter = Router();
serverRouter.use('/user', userRouter);

export default serverRouter