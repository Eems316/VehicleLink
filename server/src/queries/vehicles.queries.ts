import { createDbPool } from "../utils/db";

export type VehicleRow = {
    vehicleId: number;
    year: number;
    make: string;
    model: string;
    vin: string | null;
    color: string | null;
    odometer: number | null;
    dateRecieved: string | null;
    lotSpaceCode: string | null;
};

export type VehicleFilters = {
    year?: number;
    make?: string;
    model?: string;
};

export async function findVehicles(filters: VehicleFilters): Promise<VehicleRow[]> {
    const pool = createDbPool();

    const where: string[] = [];
    const params: any[] = [];

    if (typeof filters.year === "number") {
        where.push("v.year = ?");
        params.push(filters.year);
    }

    if (filters.make) {
        where.push("mk.name = ?");
        params.push(filters.make);
    }

    if (filters.model) {
        where.push("md.name = ?");
        params.push(filters.model);
    }

    const whereSql = where.length ? `WHERE ${where.join(" AND ")}` : "";

    const sql = `
    SELECT
        v.id AS vehicleId,
        v.year AS year,
        mk.name AS make,
        md.name AS model,
        v.vin AS vin,
        v.color AS color,
        v.odometer AS odometer,
        v.date_received AS dateReceived,
        v.lot_space_code AS lotSpaceCode
    FROM vehicles v
    JOIN models md ON md.id = v.model_id
    JOIN makes mk ON mk.id = md.make_id
    ${whereSql}
    ORDER BY v.year DESC, mk.name ASC, md.name ASC, v.id DESC
    `;

    const [rows] = await pool.query(sql, params);

    return rows as VehicleRow[];
}