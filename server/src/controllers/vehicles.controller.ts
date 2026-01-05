import type { RequestHandler } from "express";
import { sendSuccess } from "../utils/response";
import { AppError } from "../utils/appError";
import { findVehicles } from "../queries/vehicles.queries";

export const listVehicles: RequestHandler = async (req, res) => {
    const yearRaw = req.query.year;
    const make = typeof req.query.make === "string" ? req.query.make : undefined;
    const model = typeof req.query.model === "string" ? req.query.model : undefined;

    let year: number | undefined;
    if (typeof yearRaw === "string" && yearRaw.length > 0) {
        const n = Number(yearRaw);
        if (!Number.isFinite(n)) throw new AppError("year must be a number", 400);
        year = n;
    }

    const filters: { year?: number; make?: string; model?: string } = {};
    if (year !== undefined) filters.year = year;
    if (make !== undefined) filters.make = make;
    if (model !== undefined) filters.model = model;

    const items = await findVehicles(filters);

    return sendSuccess(res, "Vehicles retrieved", {items}, 200);
}