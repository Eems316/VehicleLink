import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { listParts } from "../controllers/parts.controller";

export const partsRouter = Router();

/** 
 * Contract:
 * GET /api/v1/parts
*/
partsRouter.get(
    "/",
    asyncHandler(async (req, res, next) => listParts(req, res, next))
);