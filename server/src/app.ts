import express from "express";
import cors from "cors";
import { requestLogger } from "./middlewares/requestLogger";
import { errorHandler } from "./middlewares/errorHandler";
import { error } from "node:console";

export const app = express()

//Middleware
app.use(requestLogger);
app.use(cors());
app.use(express.json());

// Routes
app.get("/health", (_req, res) => {
    res.status(200).json({ status: "ok" });
});

/* app.get("/ise500", () => {
    throw new Error("ise500");
}); */

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        status: "error",
        message: `Route not found: ${req.method} ${req.originalUrl}`
    });
});

// Global error handler
app.use(errorHandler);