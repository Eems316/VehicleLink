import { Router } from "express"
import { vehiclesRouter } from "./vehicles.routes";
import { partsRouter } from "./parts.routes";

export const apiRouter = Router();

apiRouter.use("/vehicles", vehiclesRouter);
apiRouter.use("/parts", partsRouter);