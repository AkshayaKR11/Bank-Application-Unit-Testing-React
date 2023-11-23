import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ViewUsers from '../ViewUsers';
import { customerService } from '../apiUrls';

jest.mock('../apiUrls');

describe('ViewUsers Component', () => {
  it('renders user details correctly', async () => {
    const mockUsers = {
      results: [
        {
          id: 1,
          username: 'Test name',
          email: 'test@example.com',
          user_role: 'customer',
        },
        {
          id: 2,
          username: 'Test name2',
          email: 'testt@example.com',
          user_role: 'customer',
        },
      ],
    };

    customerService.viewUsers.mockResolvedValueOnce({ data: mockUsers });

    render(
      <MemoryRouter>
        <ViewUsers />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(customerService.viewUsers).toHaveBeenCalled();
      expect(screen.getByText('Test name')).toBeInTheDocument();
      expect(screen.getByText('test@example.com')).toBeInTheDocument();
      expect(screen.getByText('Test name2')).toBeInTheDocument();
      expect(screen.getByText('testt@example.com')).toBeInTheDocument();
      expect(screen.getAllByText('Update User')).toHaveLength(2);
    });
  });
  it('handles error while fetching users', async () => {
    const errorMessage = 'Error fetching users';

    const alertMock = jest.spyOn(window, 'alert');
    alertMock.mockImplementation(() => {});
  
    customerService.viewUsers.mockRejectedValueOnce((errorMessage));
  
  
    render(
      <MemoryRouter>
        <ViewUsers />
      </MemoryRouter>
    );
  
   
    expect(customerService.viewUsers).toHaveBeenCalled();
  
   
    await waitFor(() => {
      expect(alertMock).toHaveBeenCalledTimes(1);
      expect(alertMock).toHaveBeenCalledWith((errorMessage));
    });
  });
  
});
