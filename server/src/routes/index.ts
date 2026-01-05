import { Router } from "express"
import { vehiclesRouter } from "./vehicles.routes";
import { partsRouter } from "./parts.routes";
import { vehicleOptionsRouter } from "./vehicleOptions.routes";

export const apiRouter = Router();

apiRouter.use("/vehicles", vehiclesRouter);
apiRouter.use("/parts", partsRouter);
apiRouter.use("/vehicles/options", vehicleOptionsRouter)