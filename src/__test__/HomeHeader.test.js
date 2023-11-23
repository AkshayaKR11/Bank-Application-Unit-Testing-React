import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import HomeHeader from '../HomeHeader';

describe('HomeHeader Component', () => {
  it('renders navigation buttons with correct links', () => {
    render(
      <MemoryRouter>
        <HomeHeader />
      </MemoryRouter>
    );

    expect(screen.getByRole('button', { name: /Login/i }));
    expect(screen.getByRole('button', { name: /Sign up/i }));
    expect(screen.getByRole('button', { name: /About Us/i }));
    expect(screen.getByRole('button', { name: /Contact/i }));
  });
  it('contains expected number of navigation buttons', () => {
    render(
        <MemoryRouter>
        <HomeHeader />
      </MemoryRouter>
    );
    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBe(4); 
  });
});
