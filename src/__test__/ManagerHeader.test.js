import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ManagerHeader from '../ManagerHeader';

describe('ManagerHeader component', () => {
  it('renders navigation buttons with correct routes', () => {
    render(
      <BrowserRouter>
        <ManagerHeader />
      </BrowserRouter>
    );
    expect(screen.getByRole('button', { name: 'View Customers' }));
    expect(screen.getByRole('button', { name: 'View Staff' }));
    expect(screen.getByRole('button', { name: 'Transaction History' }));
    expect(screen.getByRole('button', { name: 'Download Transaction'}));
    expect(screen.getByRole('button', { name: 'Logout'}));
  });
  it('contains expected number of navigation buttons', () => {
    render(
        <BrowserRouter>
        <ManagerHeader />
      </BrowserRouter>
    );
    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBe(5); 
  });
});
