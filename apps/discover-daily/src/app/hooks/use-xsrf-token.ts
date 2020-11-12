import { useCallback, useEffect, useState } from 'react';
import Cookies from 'js-cookie';

export function useXsrfToken(): [string | undefined, () => void] {
  const [xsrfToken, setXsrfToken] = useState<string>(undefined);
  useEffect(() => {
    setXsrfToken(Cookies.get('XSRF-TOKEN'));
  }, []);

  const clearXsrfToken = useCallback(() => {
    setXsrfToken(undefined);
    Cookies.remove('XSRF-TOKEN');
  }, []);

  return [xsrfToken, clearXsrfToken];
}
