import { useCookies } from 'react-cookie';
import { useState, useEffect } from 'react';

import { UserClientData } from '../model/user';

export const usePaywall = (onePagerUrl: string): boolean => {
  const [isBlocked, setIsBlocked]: [boolean, any] = useState(false);
  const [cookies, setCookie] = useCookies(['userId']);

  /** Async check if this page is blocked by the paywall. True if blocked. */
  async function checkPaywall(url: string, userId: string = 'new'): boolean {
    const serverResponse = await fetch(`/api/canRead/${url}/${userId}`);
    const user = await serverResponse.json();
    // Set cookie for new user ID, or refresh cookie to delay expiration.
    setCookie('userId', user.userId, {
      path: '/',
      maxAge: 60*60*24*15, // Expires in 15 days
      sameSite: true
    });
    return !user.allowed;
  }

  useEffect(() => {
    checkPaywall(onePagerUrl, cookies.userId).then((paywallCheck) => setIsBlocked(paywallCheck));
  }, [onePagerUrl, cookies.userId]);

  return isBlocked;
}