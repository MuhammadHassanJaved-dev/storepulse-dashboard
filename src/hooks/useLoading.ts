"use client";

// Data is local/mock so no async loading is needed.
// The hook remains for API compatibility but always returns false.
export function useLoading(_delay?: number): boolean {
  return false;
}
