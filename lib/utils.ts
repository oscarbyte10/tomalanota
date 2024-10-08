import { type ClassValue, clsx } from 'clsx';
import { customAlphabet } from 'nanoid';
import { twMerge } from 'tailwind-merge';
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyz0123456789');

export interface CrudBaseRespose {
  success: boolean;
  message?: string;
  body?: any;
}
