import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

type BigIntConvertible =
  | bigint
  | string
  | number
  | boolean
  | null
  | undefined
  | Date
  | BigIntConvertible[]
  | { [key: string]: BigIntConvertible }


type Converted<T> =
  T extends bigint ? string :
  T extends (infer U)[] ? Converted<U>[] :
  T extends Date ? Date :
  T extends object ? { [K in keyof T]: Converted<T[K]> } :
  T;

export function convertObjectBigIntToString<T extends BigIntConvertible>(obj: T): Converted<T> {
  if (Array.isArray(obj)) {
    return obj.map(convertObjectBigIntToString) as Converted<T>;
  } else if (obj && typeof obj === "object" && !(obj instanceof Date)) {
    const result: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(obj)) {
      result[k] = convertObjectBigIntToString(v as BigIntConvertible);
    }
    return result as Converted<T>;
  } else if (typeof obj === "bigint") {
    return obj.toString() as Converted<T>;
  }
  return obj as Converted<T>;
}
