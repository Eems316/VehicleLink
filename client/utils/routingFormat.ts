import { ApiResponse, OptionsPayload, PartsPayload, VehiclePayload } from "@/types/types";
import { checkIfEmpty } from "./dataFormat";
import { PartRow } from "@/types/parts.types";

// gets and returns required data from the payload, used to make routes.ts understandable
export function formatOptionsPayload(response: ApiResponse<OptionsPayload>): string[] {
    return response.data.items;
}

export function formatVehiclesPayload(response: ApiResponse<VehiclePayload>) {
    return response.data.items;
}

export function formatPartsPayload(response: ApiResponse<PartsPayload>): PartRow[] {
    return response.data.items;
}

// format useStates into URL to send to API
export function formatModelSearch(url: string, make: string) {
    const params = new URLSearchParams();

    if (!checkIfEmpty(make)) params.set("make", make!.trim());

    const ext = params.toString();

    const u = ext ? url + "?" + ext : url;
    return u;
}

export function formatYearSearch(url: string, make: string, model: string) {
    const params = new URLSearchParams();

    if (!checkIfEmpty(make)) params.set("make", make!.trim());
    if (!checkIfEmpty(model)) params.set("model", model!.trim());

    const ext = params.toString();

    const u = ext ? url + "?" + ext : url;
    return u;
}

export function formatVehicleSearch(url: string, make: string, model: string, year: string) {
    const params = new URLSearchParams();

    if (!checkIfEmpty(make)) params.set("make", make!.trim());
    if (!checkIfEmpty(model)) params.set("model", model!.trim());
    if (!checkIfEmpty(year)) params.set("year", year!.trim());

    const ext = params.toString();

    const u = ext ? url + "?" + ext : url;
    return u;
}