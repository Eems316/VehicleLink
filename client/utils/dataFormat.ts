// Checks if a value is empty in reference to an API Payload (any == empty)
export function checkIfEmpty(val: string) {
    if (!val || val.toLowerCase() === "any") {
        return true;
    }
    return false;
}

// formats iso strings into local dates
export function formatLocalDate(isoString: string): string {
    if (!isoString) return "";

    const date = new Date(isoString);

    if (isNaN(date.getTime())) return "";

    return date.toLocaleDateString(undefined, {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    });
}

// gets a generic array of objects and sorts it by a property of the passed type
export function sortBy<T>(
    items: T[],
    key: keyof T,
    direction: "asc" | "desc" = "asc"
): T[] {
  return [...items].sort((a, b) => {
    const aVal = a[key];
    const bVal = b[key];

    if (aVal == null || bVal == null) return 0;

    if (typeof aVal === "number" && typeof bVal === "number") {
        return direction === "asc" ? aVal - bVal : bVal - aVal;
    }

    return direction === "asc"
        ? String(aVal).localeCompare(String(bVal))
        : String(bVal).localeCompare(String(aVal));
    });
}

// gets a generic array of objects and returns a new array of the passed type without duplicates
export function getCategories<T, K extends keyof T>(
    items: T[],
    key: K
): T[K][] {
    const seen = new Set<T[K]>();

    for (const item of items) {
        const value = item[key];
        if (value !== undefined && value !== null) {
        seen.add(value);
        }
    }

  return Array.from(seen);
}