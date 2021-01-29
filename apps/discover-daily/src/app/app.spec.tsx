import { render } from '@testing-library/react';
import React from 'react';
import App from './app';
import { AuthContextProvider } from './contexts/auth.context';
import { BrowserRouter } from 'react-router-dom';

describe('App', () => {
  it('should render successfully', async () => {
    const { baseElement } = render(
      <BrowserRouter>
        <AuthContextProvider>
          <App />
        </AuthContextProvider>
      </BrowserRouter>
    );
    expect(baseElement).toBeTruthy();
  });
});
