import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

export function useXsrfToken() {
  const [xsrfToken, setXsrfToken] = useState<string>(undefined);
  useEffect(() => {
    setXsrfToken(Cookies.get('XSRF-TOKEN'));
  }, []);

  return xsrfToken;
}
