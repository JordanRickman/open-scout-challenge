import { useCookies } from 'react-cookie';
import { useState, useEffect } from 'react';

import { UserClientData } from '../model/user';

export const usePaywall = (onePagerUrl: string): {
  isBlocked: boolean;
  markPaid: () => void;
} => {
  const [isBlocked, setIsBlocked]: [boolean, any] = useState(false);
  const [cookies, setCookie] = useCookies(['userId']);

  /** Async check if this page is blocked by the paywall. True if blocked. */
  async function checkPaywall(url: string, userId: string = 'new') {
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

  /** Mark the current user as having paid. */
  // function markPaid(userId: string) {
  //   return fetch(`/api/markPaid/${userId}`, {method: 'POST'})
  //     .then(() => console.log('paid.')); // DEBUG
  // }
  async function markPaid(userId: string) {
    const serverResponse = await fetch(`/api/markPaid/${userId}`, {method: 'POST'});
    if (serverResponse.ok) {
      setIsBlocked(false);
    }
  }

  return { isBlocked: isBlocked, markPaid: () => markPaid(cookies.userId) };
}