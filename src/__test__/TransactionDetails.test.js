import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import TransactionDetails from '../TransactionDetails';
import { customerService } from '../apiUrls';

jest.mock('../apiUrls');

describe('TransactionDetails Component', () => {
  it('renders transaction details correctly', async () => {
    const mockTransactions = {
      members: [
        {
          id: 1,
          transaction_type: 'Deposit',
          transaction_amount: 500,
          transaction_date: '2023-11-15',
        },
        {
          id: 2,
          transaction_type: 'Withdraw',
          transaction_amount: 300,
          transaction_date: '2023-11-16',
        },
      ],
    };

    customerService.transaction_details.mockResolvedValueOnce({ data: mockTransactions });

    render(
      <MemoryRouter>
        <TransactionDetails />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(customerService.transaction_details).toHaveBeenCalled();
      expect(screen.getByText('Deposit')).toBeInTheDocument();
      expect(screen.getByText('Withdraw')).toBeInTheDocument();
      expect(screen.getByText('500')).toBeInTheDocument();
      expect(screen.getByText('300')).toBeInTheDocument();
      expect(screen.getByText('2023-11-15')).toBeInTheDocument();
      expect(screen.getByText('2023-11-16')).toBeInTheDocument();
    });
  });
  it('handles error while fetching transactions', async () => {
    const errorMessage = 'Error fetching transactions';

    const alertMock = jest.spyOn(window, 'alert');
    alertMock.mockImplementation(() => {});
  
    customerService.transaction_details.mockRejectedValueOnce((errorMessage));
  
  
    render(
      <MemoryRouter>
        <TransactionDetails />
      </MemoryRouter>
    );
  
   
    expect(customerService.transaction_details).toHaveBeenCalled();
  
   
    await waitFor(() => {
      expect(alertMock).toHaveBeenCalledTimes(1);
      expect(alertMock).toHaveBeenCalledWith((errorMessage));
    });
  });
});
