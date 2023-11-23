import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ClosedAccounts from '../ClosedAccounts';
import { customerService } from '../apiUrls';

jest.mock('../apiUrls');

describe('ClosedAccounts Component', () => {
  it('displays closed account details wrongly', async () => {
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

    customerService.accountdetails.mockResolvedValueOnce({ data: mockAccounts });

    render(
      <MemoryRouter>
        <ClosedAccounts />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(customerService.accountdetails).toHaveBeenCalled();
    });

    expect(screen.findByText())
  });
  it('handles error while fetching closed  accounts', async () => {
    const errorMessage = 'Error fetching closed  accounts';

    const alertMock = jest.spyOn(window, 'alert');
    alertMock.mockImplementation(() => {});
  
    customerService.accountdetails.mockRejectedValueOnce((errorMessage));
  
  
    render(
      <MemoryRouter>
       <ClosedAccounts />
      </MemoryRouter>
    );
  
   
    expect(customerService.accountdetails).toHaveBeenCalled();
  
   
    await waitFor(() => {
      expect(alertMock).toHaveBeenCalledTimes(1);
      expect(alertMock).toHaveBeenCalledWith((errorMessage));
    });
  });
  it('displays only closed account details', async () => {
    const mockAccounts = [
      {
        id: 1,
        account_number: '123456',
        account_type: 'Savings',
        account_balance: 1000,
        joined_date: '2023-11-15',
        status: 'Approved',
      },
      {
        id: 2,
        account_number: '789012',
        account_type: 'Savings',
        account_balance: 500,
        joined_date: '2023-11-20',
        status: 'Closed',
      },
    ];

    const mockResponse = {
      data: {
        results: mockAccounts,
      },
    };

    customerService.accountdetails.mockResolvedValueOnce(mockResponse);

    render(
      <MemoryRouter><ClosedAccounts /></MemoryRouter>
        
    );

    await waitFor(() => {
      expect(screen.findByText('123456'));
      expect(screen.queryByText('789012')).not.toBeInTheDocument(); 
      
    });
  });
  it('renders closed account details correctly', async () => {
    const mockAccounts = {
      results: [
        {
          id: 1,
          account_number: '123456789',
          account_type: 'Savings',
          account_balance: 1000,
          joined_date: '2023-11-15',
          status: 'Closed',
        },
        {
          id: 2,
          account_number: '987654321',
          account_type: 'Salary',
          account_balance: 2000,
          joined_date: '2023-11-16',
          status: 'Closed',
        },
      ],
    };

    customerService.accountdetails.mockResolvedValueOnce({ data: mockAccounts });

    render(
      <MemoryRouter>
       <ClosedAccounts />
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

});
