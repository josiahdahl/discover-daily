import { cleanup, getByText, render, wait } from '@testing-library/react';
import React from 'react';
import App from './app';

describe('App', () => {
  it('should render successfully', async () => {
    const { baseElement } = render(<App />);
    expect(baseElement).toBeTruthy();
  });
});
