import React from 'react';
import { render, screen, fireEvent,waitFor } from '@testing-library/react';
import Transaction from '../Transaction'
import { customerService } from '../apiUrls';
import { MemoryRouter } from 'react-router-dom';

jest.mock('../apiUrls');
describe('Transaction Component', () => {

  it('handles deposit form submission successfully', async () => {
    const alertMock=jest.spyOn(window,'alert');
    alertMock.mockImplementation(()=>{});

    const mockResponse = { data: { message: 'Deposited Successfully' } };
    customerService.deposit.mockResolvedValueOnce(mockResponse);

    render( <MemoryRouter>
      <Transaction />
    </MemoryRouter>);

    const amountInput = screen.getByLabelText('Amount');
    const depositButton = screen.getByRole('button', { name: /Deposit/i });

    fireEvent.change(amountInput, { target: { value: '100' } });
    fireEvent.click(depositButton);
 
    await waitFor(() => {
    expect(customerService.deposit).toHaveBeenCalledWith({ amount: '100' });
    expect(alertMock).toHaveBeenCalledWith('Deposited Successfully');
    alertMock.mockRestore();
  });
  });

  it('handles withdrawal form submission successfully', async () => {

    const alertMock=jest.spyOn(window,'alert');
    alertMock.mockImplementation(()=>{});

    const mockResponse = { data: { message: 'Withdrew Successfully' } };
    customerService.withdraw.mockResolvedValueOnce(mockResponse);

    render(<MemoryRouter><Transaction /></MemoryRouter>);

    const amountInput = screen.getByLabelText('Amount');
    const withdrawButton = screen.getByRole('button', { name: /Withdraw/i });

    fireEvent.change(amountInput, { target: { value: '50' } });
    fireEvent.click(withdrawButton);

    await waitFor(() => {
      expect(customerService.withdraw).toHaveBeenCalledWith({ amount: '50' });
      expect(alertMock).toHaveBeenCalledWith('Withdrew Successfully');
      alertMock.mockRestore();
  });
});

  it('handles error on deposit form submission', async () => {

    const alertMock=jest.spyOn(window,'alert');
    alertMock.mockImplementation(()=>{});

    const errorMessage = 'Deposit failed';
    customerService.deposit.mockRejectedValueOnce({ response: { data: { message: errorMessage } } });

    render(<MemoryRouter><Transaction /></MemoryRouter>);

    const depositButton = screen.getByRole('button', { name: /Deposit/i });
    fireEvent.click(depositButton);
   await waitFor(()=>{
    expect(customerService.deposit).toHaveBeenCalled();
    expect(alertMock).toHaveBeenCalledWith(errorMessage);
    alert.mockRestore();
   });
  });

  it('handles error on withdrawal form submission', async () => {
    const alertMock=jest.spyOn(window,'alert');
    alertMock.mockImplementation(()=>{});
    
    const errorMessage = 'Withdrawal failed';
    customerService.withdraw.mockRejectedValueOnce({ response: { data: { message: errorMessage } } });

    render(<MemoryRouter><Transaction /></MemoryRouter>);

    const withdrawButton = screen.getByRole('button', { name: /Withdraw/i });
    fireEvent.click(withdrawButton);
    await waitFor(()=>{
    expect(customerService.withdraw).toHaveBeenCalled();
    expect(alertMock).toHaveBeenCalledWith(errorMessage);
  });
  });
});
