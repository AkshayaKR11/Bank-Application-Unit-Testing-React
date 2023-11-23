import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';

describe('App component', () => {
  it('renders without crashing', () => {
    render(<MemoryRouter><App /></MemoryRouter>);
  });
});
