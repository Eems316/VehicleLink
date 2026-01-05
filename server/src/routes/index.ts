import { Router } from "express"
import { vehiclesRouter } from "./vehicles.routes";

export const apiRouter = Router();

apiRouter.use("/vehicles", vehiclesRouter);