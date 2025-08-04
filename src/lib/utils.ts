import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function convertObjectBigIntToString(obj: any): any {
  if (Array.isArray(obj)) {
    return obj.map(convertObjectBigIntToString);
  } else if (obj && typeof obj === "object") {
    return Object.fromEntries(
      Object.entries(obj).map(([k, v]) => [k, convertObjectBigIntToString(v)])
    );
  } else if (typeof obj === "bigint") {
    return obj.toString();
  }
  return obj;
}