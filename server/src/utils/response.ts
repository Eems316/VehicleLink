import type { Response } from "express"

export type ApiStatus = "success" | "error";

export interface ApiResponse<T> {
    status: ApiStatus;
    mesage: string;
    data: T;
}

export function sendSuccess<T>(
    res: Response,
    message: string,
    data: T,
    statusCode = 200
): Response<ApiResponse<T>> {
    return res.status(statusCode).json({
        status: "success",
        message,
        data,
    });
}

export function sendError(
    res: Response,
    message: string,
    statusCode = 400
): Response<ApiResponse<null>> {
    return res.status(statusCode).json({
        status: "error",
        message,
        data: null,
    });
}