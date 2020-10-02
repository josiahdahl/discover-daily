import { render } from '@testing-library/react';
import React from 'react';
import App from './app';
import { AuthContextProvider } from './contexts/auth.context';

describe('App', () => {
  it('should render successfully', async () => {
    const { baseElement } = render(
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    );
    expect(baseElement).toBeTruthy();
  });
});
