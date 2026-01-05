import express from "express";
import cors from "cors";
import { requestLogger } from "./middlewares/requestLogger";
import { errorHandler } from "./middlewares/errorHandler";
import { notFound } from "./middlewares/notFound";
import { AppError } from "./utils/appError";

export const app = express()

//Middleware
app.use(requestLogger);
app.use(cors());
app.use(express.json());

// Routes
app.get("/health", (_req, res) => {
    res.status(200).json({ status: "ok" });
});

/* app.get("/err400", () => {
    throw new AppError("err400", 400);
}); 

app.get("/err500", () => {
    throw new AppError("err500", 500);
});  */

// 404 handler
app.use(notFound);

// Global error handler
app.use(errorHandler);