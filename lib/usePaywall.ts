import { useCookies } from 'react-cookie';
import { useState, useEffect } from 'react';

export const usePaywall = (onePagerUrl: string): boolean => {
  const [isBlocked, setIsBlocked]: [boolean, any] = useState(false);
  const [cookies, setCookie] = useCookies(['userId']);

  const RESOLVE_TIME_MS = 500;
  /** Async check if this page is blocked by the paywall. True if blocked. */
  const checkPaywall = (url: string): Promise<boolean> =>
    new Promise((resolve) =>
      setTimeout(() => resolve(true), RESOLVE_TIME_MS)
    );

  useEffect(() => {
    checkPaywall(onePagerUrl).then((paywallCheck) => setIsBlocked(paywallCheck));
  });

  return isBlocked;
}