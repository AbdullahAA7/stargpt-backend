//importing packages/files
import { Router } from "express";
import userRouter from "./userRouter.js";
let starRouter = Router();
//middlewares
starRouter.use("/user", userRouter);
//Exporting Router
export default starRouter;
