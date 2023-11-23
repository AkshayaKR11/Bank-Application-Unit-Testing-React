import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import StaffHeader from '../StaffHeader';

describe('StaffHeader component', () => {
  it('renders navigation buttons with correct routes', () => {
    render(
      <BrowserRouter>
        <StaffHeader />
      </BrowserRouter>
    );

    expect(screen.getByRole('button', { name: 'View Customers' }));
    expect(screen.getByRole('button', { name: 'Account Requests' }));
    expect(screen.getByRole('button', { name: 'View Accounts' }));
    expect(screen.getByRole('button', { name: 'Transaction History' }));
    expect(screen.getByRole('button', { name: 'Download Transaction' }));
    expect( screen.getByRole('button', { name: 'Closed Accounts' }));
    expect( screen.getByRole('button', { name: 'Logout' }));
  });

  it('contains expected number of navigation buttons', () => {
    render(
      <BrowserRouter>
        <StaffHeader />
      </BrowserRouter>
    );

    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBe(7); 
  });
});
