import { ApiResponse } from "./types";

// vehicle related types
export type VehicleRow = {
    vehicleId: number;
    year: number;
    make: string;
    model: string;
    vin: string | null;
    color: string | null;
    odometer: number | null;
    dateReceived: string | null;
    lotSpaceCode: string | null;
};

export type VehicleFilters = {
    year?: number;
    make?: string;
    model?: string;
};

export type Options = {
    items: string[];
}