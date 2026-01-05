import dotenv from "dotenv";
dotenv.config();

import { app } from "./app";
import { logger } from "./utils/logger";

const PORT = process.env.PORT ? Number(process.env.PORT) : 8080;

app.listen(PORT, () => {
    logger.info(`Server running on http://localhost:${PORT}`);
})