import { createDbPool } from "../utils/db";

export async function getAvailableMakes(): Promise<string[]> {
    const pool = createDbPool();

    const sql = `
        SELECT DISTINCT mk.name AS make
        FROM vehicles v
        JOIN models md ON md.id = v.model_id
        JOIN makes mk ON mk.id = md.make_id
        ORDER BY mk.name ASC
    `;

    const [rows] = await pool.query(sql);
    return (rows as Array<{ make: string }>).map(r => r.make);
}

export async function getAvailableModelsByMake(make:string): Promise<string[]> {
    const pool = createDbPool();

    const sql = `
        SELECT DISTINCT md.name AS model
        FROM vehicles v
        JOIN models md ON md.id = v.model_id
        JOIN makes mk ON mk.id = md.make_id
        WHERE mk.name = ?
        ORDER BY md.name ASC
    `;

    const [rows] = await pool.query(sql, [make]);
    return (rows as Array<{ model: string }>).map(r => r.model);
}

export async function getAvailableYearsByMakeModel(
    make: string,
    model: string
): Promise<number[]> {
    const pool = createDbPool();

    const sql = `
        SELECT DISTINCT v.year AS year
        FROM vehicles v
        JOIN models md ON md.id = v.model_id
        JOIN makes mk ON mk.id = md.make_id
        WHERE mk.name = ? AND md.name = ?
        ORDER BY v.year DESC
    `;

    const [rows] = await pool.query(sql, [make, model]);
    return (rows as Array<{ year: number }>).map(r => Number(r.year));
}