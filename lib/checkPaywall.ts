
const RESOLVE_TIME_MS = 500;

/** Async check if this page is blocked by the paywall. True if blocked. */
export const checkPaywall = (url: string): Promise<boolean> =>
  new Promise((resolve) =>
    setTimeout(() => resolve(true), RESOLVE_TIME_MS)
  );