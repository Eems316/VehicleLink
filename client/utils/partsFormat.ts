import { PartCategory, PartRow } from "@/types/parts.types";

export function groupPartsByCategory(parts: PartRow[]): PartCategory[] {
  const buckets: Record<string, PartRow[]> = {};

  for (const part of parts) {
    const c = part.category ?? "";
    (buckets[c] ??= []).push(part);
  }

  return Object.entries(buckets)
    //.sort(([a], [b]) => a.localeCompare(b)) // optional: stable order
    .map(([category, parts]) => ({ category, parts }));
}