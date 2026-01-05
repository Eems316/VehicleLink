import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { listMakes, listModels, listYears } from "../controllers/vehicleOptions.controller"

export const vehicleOptionsRouter = Router();

/**
 *  GET /api/v1/vehicles/options/makes
 */
vehicleOptionsRouter.get(
    "/makes",
    asyncHandler(async (req, res, next) => listMakes(req, res, next))
)


/**
 *  GET /api/v1/vehicles/options/models?make=[make]
 */
vehicleOptionsRouter.get(
    "/models",
    asyncHandler(async (req, res, next) => listModels(req, res, next))
)


/**
 *  GET /api/v1/vehicles/options/years?make=[make]&model=[model]
 */
vehicleOptionsRouter.get(
    "/years",
    asyncHandler(async (req, res, next) => listYears(req, res, next))
)