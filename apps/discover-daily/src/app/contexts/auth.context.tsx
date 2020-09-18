import * as React from 'react';
import { FunctionComponent, useEffect, useState } from 'react';
import { apiClient } from '../services/api-client';

export interface AuthContextValue {
  isAuthed: boolean;
  isHydrated: boolean;
  logout: () => void;
}

export const AuthContext = React.createContext<AuthContextValue>(null);

export const AuthContextProvider: FunctionComponent = ({ children }) => {
  const [isAuthed, setIsAuthed] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  async function checkAuth() {
    setIsAuthed(await apiClient.hasSession());
  }

  function logout() {
    setIsAuthed(false);
  }

  useEffect(() => {
    checkAuth().then(() => {
      setIsHydrated(true);
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{ isAuthed, isHydrated, logout }}
      children={children}
    />
  );
};
