import React, { useContext } from 'react';
import { Route, Switch } from 'react-router-dom';
import { AuthContext } from './contexts/auth.context';
import { Dashboard } from './pages/dashboard';
import { Landing } from './pages/landing';
import { Login } from './pages/login';

export const App = () => {
  const { isAuthed, isHydrated } = useContext(AuthContext);
  return (isHydrated ?
      <Switch>
        <Route path="/login/success">
          <Login/>
        </Route>
        <Route path="/login">
          <Login/>
        </Route>
        <Route path="/">
          {isAuthed ? <Dashboard/> : <Landing/>}
        </Route>
      </Switch>
      : null
  );
};

export default App;
