export function normalizeToArray(
  value: undefined | string | string[]
): string[] | undefined {
  if (value === undefined) return undefined;
  if (typeof value === "string") return [value];
  if (Array.isArray(value)) return value;
  return undefined; 
}