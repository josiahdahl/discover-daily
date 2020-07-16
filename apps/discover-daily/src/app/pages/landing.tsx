import * as React from 'react';
import { apiClient } from '../services/api-client';

export const Landing = () => {
  return <a href={apiClient.loginUrl}>Login</a>
}
