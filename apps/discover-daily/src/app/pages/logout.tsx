import * as React from 'react';
import { useCallback, useContext, useEffect } from 'react';
import { CenteredFullPage } from '../components/Layout';
import { Text } from '@chakra-ui/core';
import { apiClient } from '../services/api-client';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../contexts/auth.context';

export const Logout = () => {
  const history = useHistory();
  const { logout } = useContext(AuthContext);
  const handleLogout = useCallback(async () => {
    try {
      await apiClient.logout();
    } catch (e) {
      // we tried :)
    }
    logout();
    setTimeout(() => {
      history.push('/');
    }, 1000);
  }, [history, logout]);

  useEffect(() => {
    handleLogout();
  }, [handleLogout]);

  return (
    <CenteredFullPage>
      <Text fontSize="xl">Cya!</Text>
    </CenteredFullPage>
  );
};
