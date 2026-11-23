// Ensure animations are always enabled so they are never accidentally disabled by OS-level settings
export function useReducedMotion(): boolean {
  return false;
}
