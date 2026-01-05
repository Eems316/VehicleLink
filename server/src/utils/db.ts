import mysql, { type PoolOptions } from "mysql2/promise";

export function createDbPool() {
  const host = process.env.DB_HOST;
  const user = process.env.DB_USER;
  const database = process.env.DB_NAME;
  const port = process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306;

  if (!host || !user || !database) {
    throw new Error("Missing required DB env vars (DB_HOST, DB_USER, DB_NAME).");
  }

  const baseConfig: PoolOptions = {
    host,
    user,
    database,
    port,
    waitForConnections: true,
    connectionLimit: 10,
    namedPlaceholders: true,
  };

  if (process.env.DB_PASSWORD) {
    baseConfig.password = process.env.DB_PASSWORD;
  }

  return mysql.createPool(baseConfig);
}