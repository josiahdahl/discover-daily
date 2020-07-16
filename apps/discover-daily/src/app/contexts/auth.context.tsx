import * as React from 'react';
import { FunctionComponent, useEffect, useState } from 'react';
import { apiClient } from '../services/api-client';

export interface AuthContextValue {
  isAuthed: boolean;
  isHydrated: boolean;
}

function defaultValue() {
  return { isAuthed: false, isHydrated: false };
}

export const AuthContext = React.createContext<AuthContextValue>(defaultValue());

export const AuthContextProvider: FunctionComponent = ({ children }) => {
  const [isAuthed, setIsAuthed] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  async function checkAuth() {
    setIsAuthed(await apiClient.hasSession());
  }

  function hydrate() {
    checkAuth().then(() => {
      setIsHydrated(true);
    });
  }

  useEffect(() => {
    hydrate();
  }, []);

  return <AuthContext.Provider value={{ isAuthed, isHydrated }} children={children}/>;
};
