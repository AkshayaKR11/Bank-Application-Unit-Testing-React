import React from 'react';
import { render, waitFor, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import PendingAccounts from '../PendingAccounts';
import { customerService } from '../apiUrls';

jest.mock('../apiUrls');

describe('PendingAccounts Component', () => {
  it('renders pending account details correctly', async () => {
    const mockAccounts = {
      results: [
        {
          id: 1,
          account_number: '123456789',
          account_type: 'Savings',
          account_balance: 1000,
          joined_date: '2023-11-15',
          status: 'Pending',
        },
        {
          id: 2,
          account_number: '987654321',
          account_type: 'Salary',
          account_balance: 2000,
          joined_date: '2023-11-16',
          status: 'Pending',
        },
      ],
    };

    customerService.accountdetails.mockResolvedValueOnce({ data: mockAccounts });

    render(
      <MemoryRouter>
        <PendingAccounts />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(customerService.accountdetails).toHaveBeenCalled();
      expect(screen.getByText('123456789')).toBeInTheDocument();
      expect(screen.getByText('Savings')).toBeInTheDocument();
      expect(screen.getByText('1000')).toBeInTheDocument();
      expect(screen.getByText('2023-11-15')).toBeInTheDocument();
      expect(screen.getByText('987654321')).toBeInTheDocument();
      expect(screen.getByText('Salary')).toBeInTheDocument();
      expect(screen.getByText('2000')).toBeInTheDocument();
      expect(screen.getByText('2023-11-16')).toBeInTheDocument();
    });
  });
  it('approves an account when the Approve button is clicked', async () => {
    const alertMock=jest.spyOn(window,'alert');
    alertMock.mockImplementation(()=>{});
    const mockAccounts = {
      results: [
        {
          id: 1,
          account_number: '123456789',
          account_type: 'Savings',
          account_balance: 1000,
          joined_date: '2023-11-15',
          status: 'Pending',
        },
      ],
    };
    customerService.accountdetails.mockResolvedValueOnce({ data: mockAccounts });
    customerService.approve.mockResolvedValueOnce({ data: {} });
    render(
      <MemoryRouter>
        <PendingAccounts />
      </MemoryRouter>
    );
    await waitFor(() => {
      expect(customerService.accountdetails).toHaveBeenCalled();
    });
    const approveButton = await screen.findByRole('button', { name: /Approve/i });
    fireEvent.click(approveButton);

    await waitFor(() => {
      expect(customerService.approve).toHaveBeenCalledWith(1, { status: 'Approved' });
      expect(alertMock).toHaveBeenCalledWith('!Account Approved!');
    });
  });
  it('handles error while fetching accounts', async () => {

    const alertMock = jest.spyOn(window, 'alert');
    alertMock.mockImplementation(() => {});
    const errorMessage = 'Error fetching accounts';

    customerService.accountdetails.mockRejectedValueOnce(errorMessage);

    render(
      <MemoryRouter>
        <PendingAccounts />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(alertMock).toHaveBeenCalledTimes(1);
      expect(alertMock).toHaveBeenCalledWith((errorMessage));
    });
  });

  it('handles error while approving account', async () => {
    const alertMock = jest.spyOn(window, 'alert');
    alertMock.mockImplementation(() => {});
    const errorMessage = 'Error approving account';

    const mockAccounts = {
      results: [
        {
          id: 1,
          account_number: '233456123',
          account_type: 'Savings',
          account_balance: 5000,
          joined_date: '2023-01-01',
          status: 'Pending',
        },
      ],
    };

    customerService.accountdetails.mockResolvedValueOnce({ data: mockAccounts });
    customerService.approve.mockRejectedValueOnce(errorMessage);

    render(
      <MemoryRouter>
        <PendingAccounts />
      </MemoryRouter>
    );

    const approveButton = await screen.findByRole('button', { name: /Approve/i });
    fireEvent.click(approveButton);

    await waitFor(() => {
      expect(alertMock).toHaveBeenCalledTimes(1);
      expect(alertMock).toHaveBeenCalledWith((errorMessage));
    });
  });
  

});
