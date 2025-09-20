import { twMerge } from "tailwind-merge";
import { clsx, type ClassValue } from "clsx";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
