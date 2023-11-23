import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import CustomerHeader from '../CustomerHeader';

describe('CustomerHeader component', () => {
  it('renders navigation buttons with correct routes', () => {
    render(
      <BrowserRouter>
        <CustomerHeader />
      </BrowserRouter>
    );

    expect(screen.getByRole('button', { name: 'Create Account' }));
    expect(screen.getByRole('button', { name: 'Transaction' }));
    expect(screen.getByRole('button', { name: 'Transaction History' }));
    expect(screen.getByRole('button', { name: 'Download Transaction' }));
    expect(screen.getByRole('button', { name: 'Account Details' }));
    expect(screen.getByRole('button', { name: 'Logout' }));
  });

  it('contains expected number of navigation buttons', () => {
    render(
      <BrowserRouter>
        <CustomerHeader />
      </BrowserRouter>
    );
    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBe(6); 
  });
});
