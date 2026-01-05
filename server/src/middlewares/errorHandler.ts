import type { ErrorRequestHandler } from "express";
import { AppError } from "../utils/appError";
import { logger } from "../utils/logger";

export const errorHandler: ErrorRequestHandler = (err, req, res, _next) => {
    const isAppError = err instanceof AppError;

    const statusCode = isAppError ? err.statusCode : 500;
    const message = statusCode === 500 ? "Internal Server Error" : (err?.message ?? "Error");

    const log = (req as any).log ?? logger;

    if (statusCode >= 500) {
        log.error({ err }, "Unhandled error");
    } else {
        log.warn({ err }, "Request error");
    }

    res.status(statusCode).json({
        status: "error",
        message,
        data: null,
    });
};