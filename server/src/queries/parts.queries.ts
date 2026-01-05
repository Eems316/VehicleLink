import { createDbPool } from "../utils/db";

export type PartRow = {
    partId: number;
    name: string;
    category: string;
    price: number;
};

export async function getAllParts(): Promise<PartRow[]> {
    const pool = createDbPool();

    const sql = `
    SELECT
        p.id AS partId,
        p.name AS name,
        pc.name AS category,
        p.price AS price
    FROM parts p
    JOIN part_categories pc ON pc.id = p.part_category_id
    ORDER BY pc.name ASC, p.name ASC
    `;

    const [rows] = await pool.query(sql);
    return rows as PartRow[];
}