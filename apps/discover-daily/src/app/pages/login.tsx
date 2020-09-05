import * as React from 'react';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/auth.context';
import { useHistory } from 'react-router-dom';

export function Login() {
  const { isAuthed } = useContext(AuthContext);
  const [error] = useState<string>(undefined);
  const history = useHistory();
  useEffect(() => {
    if (isAuthed) {
      history.push('/');
    }
  }, [isAuthed, history]);

  return (
    <div>
      {error ? <p>There was an error: {error}</p> : <p>Logging in...</p>}
    </div>
  );
}
