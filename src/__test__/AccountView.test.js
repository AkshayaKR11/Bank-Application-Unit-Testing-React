import React from 'react';
import { render, waitFor, screen ,act} from '@testing-library/react';
import AccountView from '../AccountView';
import { customerService } from '../apiUrls';
import { MemoryRouter } from 'react-router-dom';

jest.mock('../apiUrls');

describe('AccountView Component', () => {
  it('renders account details correctly', async () => {
    const mockAccounts = {
      results: [
        {
          id: 1,
          account_number: '123456789',
          account_type: 'Savings',
          account_balance: 1000,
          joined_date: '2023-11-15',
          status: 'Approved',
        },
      ],
    };

    customerService.account_view.mockResolvedValueOnce({ data: mockAccounts });
    render(<MemoryRouter><AccountView /></MemoryRouter>);

    await waitFor(() => {
      expect(customerService.account_view).toHaveBeenCalled();
      expect(screen.findByText('123456789'));
      expect(screen.findByText('Savings'));
      expect(screen.findByText('1000'));
      expect(screen.findByText('2023-11-15'));
      expect(screen.findByText('Approved'));
    });
});

  it('handles error while fetching account', async () => {
    const errorMessage = 'Error fetching account';
    const alertMock = jest.spyOn(window, 'alert');
    alertMock.mockImplementation(() => {});
  
    customerService.account_view.mockRejectedValueOnce((errorMessage));
    render(
      <MemoryRouter>
        <AccountView />
      </MemoryRouter>
    );
    expect(customerService.account_view).toHaveBeenCalled();
    await waitFor(() => {
      expect(alertMock).toHaveBeenCalledTimes(1);
      expect(alertMock).toHaveBeenCalledWith((errorMessage));
    });
  });
});
