import { useCookies } from 'react-cookie';
import { useState, useEffect } from 'react';

import { UserClientData } from '../model/user';

export const usePaywall = (onePagerUrl: string): {
  isBlocked: boolean;
  markPaid: () => void;
} => {
  const [isBlocked, setIsBlocked]: [boolean, any] = useState(false);
  const [cookies, setCookie] = useCookies(['userId', 'paid']);

  /** Async check if this page is blocked by the paywall. True if blocked. */
  async function checkPaywall(url: string, userId: string = 'new') {
    if (cookies.paid === 'PAID') {
      return false;
    }
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
  }, [onePagerUrl, cookies.userId, cookies.paid]);

  /** Mark the current user as having paid.
   *
   * To be more secure / harder to bypass, I had been storing
   * whether the person had paid on the server. However, this doesn't work on
   * Vercel, because each API route runs in a separate serverless function so
   * they don't share state unless you integrate a separate datastore.
   * So at the last minute, switching to storing payment flag in a cookie,
   * just to get it working.
   */
  async function markPaid(userId: string) {
    setCookie('paid', 'PAID', {
      path: '/',
      maxAge: 60*60*24*365, // Expires in one year
      sameSite: true
    });
    setIsBlocked(false);
  }

  return { isBlocked: isBlocked, markPaid: () => markPaid(cookies.userId) };
}