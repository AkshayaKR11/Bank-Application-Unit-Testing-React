import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ViewBankAccounts from '../ViewBankAccounts';
import { customerService } from '../apiUrls';
import { BrowserRouter,MemoryRouter} from 'react-router-dom';

jest.mock('../apiUrls');

describe('ViewBankAccounts Component', () => {
  it('fetches and displays approved bank accounts', async () => {
    const mockAccounts = [
      {
        id: 1,
        account_number: '123456',
        account_type: 'Savings',
        account_balance: 1000,
        joined_date: '2023-11-15',
        status: 'Approved',
      },
      
    ];

    customerService.accountdetails.mockResolvedValueOnce({ data: { results: mockAccounts } });

    render(<BrowserRouter><ViewBankAccounts /></BrowserRouter>);
    await waitFor(() => {
      expect(customerService.accountdetails).toHaveBeenCalled();
      mockAccounts.forEach((account) => {
        expect(screen.getByText(account.account_number)).toBeInTheDocument();
        expect(screen.getByText(account.account_type)).toBeInTheDocument();
        expect(screen.getByText(account.account_balance)).toBeInTheDocument();
        expect(screen.getByText(account.joined_date)).toBeInTheDocument();
        expect(screen.getByText(account.status)).toBeInTheDocument();
      });
    });
  });

  it('closes an account when the close button is clicked', async () => {
    const alertMock=jest.spyOn(window,'alert');
    alertMock.mockImplementation(()=>{});
    const mockAccounts = [
      {
        id: 1,
        account_number: '123456',
        account_type: 'Savings',
        account_balance: 1000,
        joined_date: '2023-11-15',
        status: 'Approved',
      },
    ];

    customerService.accountdetails.mockResolvedValueOnce({ data: { results: mockAccounts } });
    customerService.approve.mockResolvedValueOnce({ data: {} });

    render(<BrowserRouter><ViewBankAccounts /></BrowserRouter>);
    await waitFor(() => {
      expect(customerService.accountdetails).toHaveBeenCalled();
    });

    const closeButton = await screen.findByRole('button', { name: 'Close' });
    fireEvent.click(closeButton);

    await waitFor(() => {
      expect(customerService.approve).toHaveBeenCalledWith(1, { status: 'Closed' });
      expect(alertMock).toHaveBeenCalledWith('!Account Closed!');
      alertMock.mockRestore();
    });
  });
  it('renders  buttons', () => {
    render(<MemoryRouter><ViewBankAccounts /></MemoryRouter>);
    expect(screen.findByRole('button', { name: 'Close' }));
  });
  it('renders buttons and triggers actions on click', async () => {
    const mockAccounts = [
      {
        id: 1,
        account_number: '123456',
        account_type: 'Savings',
        account_balance: 1000,
        joined_date: '2023-11-15',
        status: 'Approved',
      },
     
    ];

    const mockResponse = {
      data: {
        results: mockAccounts,
        next: '/api/accounts?page=2',
        previous: '/api/accounts?page=1',
      },
    };

    customerService.accountdetails.mockResolvedValueOnce(mockResponse);
    customerService.url.mockResolvedValueOnce({ data: { results: mockAccounts } });
    customerService.approve.mockResolvedValueOnce({ data: {} });

    render(
      <BrowserRouter>
        <ViewBankAccounts />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(customerService.accountdetails).toHaveBeenCalled();

      const previousButton = screen.getByRole('button', { name: 'Previous' });
      const nextButton = screen.getByRole('button', { name: 'Next' });
      const closeButton = screen.getByRole('button', { name: 'Close' });
      const backButton = screen.getByRole('button', { name: 'Back' });

      expect(previousButton).toBeInTheDocument();
      expect(nextButton).toBeInTheDocument();
      expect(closeButton).toBeInTheDocument();
      expect(backButton).toBeInTheDocument();

      fireEvent.click(previousButton);
      fireEvent.click(nextButton);
      fireEvent.click(closeButton);
      fireEvent.click(backButton);

      
      expect(customerService.url).toHaveBeenCalledTimes(2); 
      expect(customerService.approve).toHaveBeenCalled(); 
      
    });
  });

});
