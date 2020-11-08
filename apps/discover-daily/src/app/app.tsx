import React, { useContext } from 'react';
import { Route, Switch } from 'react-router-dom';
import { AuthContext } from './contexts/auth.context';
import { Dashboard } from './pages/dashboard';
import { Landing } from './pages/landing';
import { CSSReset, ThemeProvider } from '@chakra-ui/core';
import { Theme } from '@discover-daily/ui';
import { Logout } from './pages/logout';

export const App = () => {
  const { isLoggedIn } = useContext(AuthContext);
  return (
    <ThemeProvider theme={Theme}>
      <CSSReset />
      <Switch>
        <Route path="/logout">
          <Logout />
        </Route>
        <Route path="/">{isLoggedIn ? <Dashboard /> : <Landing />}</Route>
      </Switch>
    </ThemeProvider>
  );
};

export default App;
