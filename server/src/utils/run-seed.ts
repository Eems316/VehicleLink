import "dotenv/config";
import fs from "node:fs/promises";
import path from "node:path";
import { createDbPool } from "./db";
import { logger } from "./logger";

async function runSqlFile(filePath: string) {
  const sql = await fs.readFile(filePath, "utf8");
  const pool = createDbPool();

  try {
    const statements = sql
      .split(/;\s*$/m)
      .map(s => s.trim())
      .filter(Boolean);

    const conn = await pool.getConnection();
    try {
      await conn.beginTransaction();

      for (const stmt of statements) {
        await conn.query(stmt);
      }

      await conn.commit();
    } catch (err) {
      await conn.rollback();
      throw err;
    } finally {
      conn.release();
    }

    logger.info({ filePath, statements: statements.length }, "Seed applied");
  } finally {
    await pool.end();
  }
}

async function main() {
  const fileArg = process.argv[2];
  const seedFile =
    fileArg ?? path.resolve(process.cwd(), "db", "seeds", "002_vehiclelink_seed.sql");

  await runSqlFile(seedFile);
}

main().catch((err) => {
  logger.error({ err }, "Seed failed");
  process.exit(1);
});