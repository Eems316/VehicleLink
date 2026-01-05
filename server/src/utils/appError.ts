export class AppError extends Error {
    public readonly statusCode: number;
    public readonly isOperational: boolean;

    constructor(message: string, statusCode = 400) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = true;

        // Fix prototype chain for TS/JS inheritance
        Object.setPrototypeOf(this, AppError.prototype);
    }
}