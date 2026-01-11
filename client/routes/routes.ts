import { PartRow } from "@/types/parts.types";
import { ApiResponse, PartsPayload, VehiclePayload } from "@/types/types";
import { OptionsPayload } from "@/types/types";
import { VehicleRow } from "@/types/vehicle.types";
import { formatModelSearch, formatOptionsPayload, formatPartsPayload, formatVehicleSearch, formatVehiclesPayload, formatYearSearch } from "@/utils/routingFormat";

// routes within website
export const CLIENT_ROUTES = (() => {
    const base = {
        home: "/",
        vehicles: "/vehicles",
        parts: "/parts",
        about: "/about",
    } as const;

    return {
    ...base,
        yard: `${base.about}#yard`,
        map: `${base.about}#map`,
    } as const;
})();

export const IMAGE_ROUTES = {
    public: "/",
    images: "/images/",
    buttons: "/images/buttons/",
    vehicles: "/images/vehicles/",
}

// routes to backend
const API_ROUTES = (() => {
    const base = {
        api: "http://localhost:8080/api/v1/",
    } as const ;
    
    return {
    ...base,
        parts: `${base.api}parts`,
        vehicles: `${base.api}vehicles`,
        makes: `${base.api}vehicles/options/makes`,
        models: `${base.api}vehicles/options/models`,
        years: `${base.api}vehicles/options/years`,
    }
})();

// Fetches available vehicles from API
export async function getVehicles(make: string, model: string, year: string): Promise<VehicleRow[]> {
    const url = formatVehicleSearch(API_ROUTES.vehicles, make, model, year);
    const res = await fetch(url);
    if (!res.ok) {
        throw new Error(`Failed to fetch vehicles (${res.status})`);
    }
    
    const data: ApiResponse<VehiclePayload> = await res.json();
    return formatVehiclesPayload(data);
}

// fetches available Parts including their name, category, and price from API
export async function getParts(): Promise<PartRow[]> {
    const res = await fetch(API_ROUTES.parts);
    if (!res.ok) {
        throw new Error(`Failed to fetch parts (${res.status})`);
    }
    
    const data: ApiResponse<PartsPayload> = await res.json();
    return formatPartsPayload(data);
}

// fetches available filter options from API
async function getOptions(url: string): Promise<string[]> {
    const res = await fetch(url);
    if (!res.ok) {
        throw new Error(`Failed to fetch options (${res.status})`);
    }
    
    const data: ApiResponse<OptionsPayload> = await res.json();
    return formatOptionsPayload(data);
}

export function getMakes() {
    const makes = getOptions(API_ROUTES.makes);
    return makes;
}

export function getModels(make: string) {
    const url = formatModelSearch(API_ROUTES.models, make);
    const models = getOptions(url);
    return models;
}

export function getYears(make: string, model: string) {
    const url = formatYearSearch(API_ROUTES.years, make, model);
    const years = getOptions(url);
    return years;
}