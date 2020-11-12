import * as React from 'react';
import { FunctionComponent, useEffect, useState } from 'react';
import { useXsrfToken } from '../hooks/use-xsrf-token';

export interface AuthContextValue {
  isLoggedIn: boolean;
  logout: () => void;
}

export const AuthContext = React.createContext<AuthContextValue>(null);

export const AuthContextProvider: FunctionComponent = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [xsrfToken, clearXsrfToken] = useXsrfToken();

  function logout() {
    setIsLoggedIn(false);
    clearXsrfToken();
  }

  useEffect(() => {
    setIsLoggedIn(!!xsrfToken);
  }, [xsrfToken]);

  return (
    <AuthContext.Provider value={{ isLoggedIn, logout }} children={children} />
  );
};
