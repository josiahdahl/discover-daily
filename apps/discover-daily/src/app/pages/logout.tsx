import * as React from 'react';
import { useContext, useEffect } from 'react';
import { CenteredFullPage } from '../components/Layout';
import { Text } from '@chakra-ui/core';
import { apiClient } from '../services/api-client';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../contexts/auth.context';

export const Logout = () => {
  const history = useHistory();
  const { logout } = useContext(AuthContext);
  async function handleLogout() {
    try {
      await apiClient.logout();
    } catch (e) {
      // we tried :)
    }
    logout();
    setTimeout(() => {
      history.push('/');
    }, 1000);
  }
  useEffect(() => {
    handleLogout();
  }, []);

  return (
    <CenteredFullPage>
      <Text fontSize="xl">Cya!</Text>
    </CenteredFullPage>
  );
};
