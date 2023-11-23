import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Logout from '../Logout';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('Logout Component', () => {


  beforeEach(() => {
    navigate = jest.fn();
    require('react-router-dom').useNavigate.mockReturnValue(navigate);
  });

  it('removes auth tokens and navigates to home header', async () => {
    const localStorageRemoveItemSpy = jest.spyOn(window.localStorage.__proto__, 'removeItem');
    render(<MemoryRouter><Logout /></MemoryRouter>);

    await waitFor(() => {
      expect(localStorageRemoveItemSpy).toHaveBeenCalledWith('authTokens');
      expect(navigate).toHaveBeenCalledWith('/home_header');
    });
  });
});
