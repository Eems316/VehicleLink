import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { listVehicles } from "../controllers/vehicles.controller";

export const vehiclesRouter = Router();

/**
 * Contract:
 * GET /api/v1/vehicles?make=[make]&model=[model]&year=[year]
 */
vehiclesRouter.get(
  "/",
  asyncHandler(async (req, res, next) => {
    return listVehicles(req, res, next);
  })
);