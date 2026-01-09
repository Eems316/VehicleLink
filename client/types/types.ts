import { VehicleRow } from "./vehicle.types";

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