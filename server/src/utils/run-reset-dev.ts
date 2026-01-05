import "dotenv/config";
import fs from "node:fs/promises";
import path from "node:path";
import { createDbPool } from "./db";
import { logger } from "./logger";

async function main() {
  const resetFile = path.resolve(
    process.cwd(),
    "db",
    "migrations",
    "000_vehiclelink_reset_dev.sql"
  );

  const sql = await fs.readFile(resetFile, "utf8");
  const pool = createDbPool();

  try {
    const statements = sql
      .split(/;\s*$/m)
      .map(s => s.trim())
      .filter(Boolean);

    for (const stmt of statements) {
      await pool.query(stmt);
    }

    logger.warn("Dev DB reset complete");
  } finally {
    await pool.end();
  }
}

main().catch((err) => {
  logger.error({ err }, "Reset failed");
  process.exit(1);
});
