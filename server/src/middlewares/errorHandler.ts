import type { ErrorRequestHandler } from "express";
import { logger } from "../utils/logger";

export const errorHandler: ErrorRequestHandler = (err, req, res, _next) => {
    const statusCode = typeof err?.statusCode === "number" ? err.statusCode : 500;

    // Log full error once, with request context
    logger.error(
        {
            err,
            method: req.method,
            path: req.originalUrl,
        },
        "Unhandled error"
    );

    res.status(statusCode).json({
        status: "error",
        message: statusCode === 500 ? "Internal Server Error" : err.message,
    });
};