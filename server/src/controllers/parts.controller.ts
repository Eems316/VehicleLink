import type { RequestHandler } from "express";
import { sendSuccess } from "../utils/response";
import { getAllParts } from "../queries/parts.queries";

export const listParts: RequestHandler = async (_req, res) => {
    const items = await getAllParts();
    return sendSuccess(res, "Parts retrieved", { items }, 200);
};