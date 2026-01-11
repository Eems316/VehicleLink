import { VehicleRow } from "./vehicle.types";
import { PartRow } from "./parts.types";

// general types not used for display data
export interface ApiResponse<T> {
    status: string;
    message: string;
    data: T;
}

export type OptionsPayload = {
    items: string[];
}

export type VehiclePayload = {
    items: VehicleRow[];
}

export type PartsPayload = {
    items: PartRow[];
}