import React, { useContext } from 'react';
import { Route, Switch } from 'react-router-dom';
import { AuthContext } from './contexts/auth.context';
import { Dashboard } from './pages/dashboard';
import { Landing } from './pages/landing';
import { Login } from './pages/login';
import { CSSReset, ThemeProvider } from '@chakra-ui/core';
import { Theme } from '@discover-daily/ui';
import { Logout } from './pages/logout';

export const App = () => {
  const { isAuthed, isHydrated } = useContext(AuthContext);
  return isHydrated ? (
    <ThemeProvider theme={Theme}>
      <CSSReset />
      <Switch>
        <Route path="/login/success">
          <Login />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/logout">
          <Logout />
        </Route>
        <Route path="/">{isAuthed ? <Dashboard /> : <Landing />}</Route>
      </Switch>
    </ThemeProvider>
  ) : null;
};

export default App;
