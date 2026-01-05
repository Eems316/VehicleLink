import type { RequestHandler } from "express";
import { sendSuccess } from "../utils/response";
import { AppError } from "../utils/appError";
import { getAvailableMakes, getAvailableModelsByMake, getAvailableYearsByMakeModel } from "../queries/vehicleOptions.queries";

export const listMakes: RequestHandler = async (_req, res ) => {
    const items = await getAvailableMakes();

    return sendSuccess(res, "Makes retrieved", { items }, 200);
};

export const listModels: RequestHandler = async (req, res ) => {
    const make = typeof req.query.make === "string" ? req.query.make.trim() : "";

    if (!make) throw new AppError("make is required", 400);

    const items = await getAvailableModelsByMake(make);
    return sendSuccess(res, "Models retrieved", { items }, 200);
};

export const listYears: RequestHandler = async (req, res ) => {
    const make = typeof req.query.make === "string" ? req.query.make.trim() : "";
    const model = typeof req.query.model === "string" ? req.query.model.trim() : "";

    if (!make) throw new AppError("make is required", 400);
    if (!model) throw new AppError("model is required", 400);

    const items = await getAvailableYearsByMakeModel(make, model);
    return sendSuccess(res, "Years retrieved", { items }, 200);
};