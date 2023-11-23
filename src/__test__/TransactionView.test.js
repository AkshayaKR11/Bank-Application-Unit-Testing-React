import React from 'react';
import { render, screen, waitFor,act} from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import TransactionView from '../TransactionView';
import { customerService } from '../apiUrls';

jest.mock('../apiUrls');

describe('TransactionView component', () => {
  const mockTransactions = [
    {
      id: 1,
      transaction_type: 'Deposit',
      transaction_amount: 500,
      transaction_date: '2023-11-16',
    },
  ];

  beforeEach(() => {
    customerService.transaction_view.mockResolvedValueOnce({ data: { transactions: mockTransactions } });
  });

  it('renders transaction details correctly', async () => {
    
    render(
      <MemoryRouter>
        <TransactionView />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(customerService.transaction_view).toHaveBeenCalled();
      expect(screen.getByText('Deposit')).toBeInTheDocument();
      expect(screen.getByText('500')).toBeInTheDocument();
      expect(screen.getByText('2023-11-16')).toBeInTheDocument();
    });
  });
  it('handles error while fetching closed accounts', async () => {
    const errorMessage = 'Error fetching transaction accounts';

    customerService.transaction_view.mockRejectedValueOnce((errorMessage));
    await act(async () => {
    render( <MemoryRouter>
      <TransactionView />
    </MemoryRouter>);
    await waitFor(()=>{
      expect(screen.findByText(errorMessage))
    });
  });
    expect(customerService.transaction_view).toHaveBeenCalled();
  });

  it('fetches, sorts, and sets transactions on component mount', async () => {
    const mockTransactions = [
      {
        id: 1,
        transaction_type:'Deposit',
        transaction_amount: 100,
        transaction_date: '2023-11-22',
      },
      {
        id: 2,
        transaction_type: 'Withdraw',
        transaction_amount: 50,
        transaction_date: '2023-11-20',
      },
    ];
  
    const mockResponse = { data: { transactions: mockTransactions } };
    customerService.transaction_view.mockResolvedValueOnce(mockResponse);
  
    render(<MemoryRouter><TransactionView /></MemoryRouter>);
  
    await waitFor(() => {
      expect(customerService.transaction_view).toHaveBeenCalledTimes(1);
      expect(screen.getByText('Transaction Details')).toBeInTheDocument();
  
      const renderedTransactionDates = screen.getAllByText(/2023-/).map((date) => date.textContent);
      const sortedTransactionDates = renderedTransactionDates.slice().sort((a, b) => new Date(b) - new Date(a));
      expect(renderedTransactionDates).toEqual(sortedTransactionDates);
    
    });
  
    expect(screen.getByText('Deposit'));
  });
  
});

