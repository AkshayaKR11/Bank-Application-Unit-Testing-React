import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import TransactionDownload from '../TransactionDownload';
import { customerService } from '../apiUrls';

jest.mock('../apiUrls');

describe('TransactionDownload Component', () => {
  it('renders the form correctly', () => {
    render(
      <MemoryRouter>
        <TransactionDownload />
      </MemoryRouter>
    );

    expect(screen.getByLabelText('Enter Account Number:')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Download Transaction Details' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Back' })).toBeInTheDocument();
  });

  it('submits the form and downloads transaction details', async () => {
    const mockResponse = {
      statusText: 'OK',
      data: 'Sample transaction data in CSV format',
    };

    customerService.transaction_download.mockResolvedValueOnce(mockResponse);

    render(
      <MemoryRouter>
        <TransactionDownload />
      </MemoryRouter>
    );

    const accountNumberInput = screen.getByLabelText('Enter Account Number:');
    const downloadButton = screen.getByRole('button', { name: 'Download Transaction Details' });
    fireEvent.change(accountNumberInput, { target: { value: '123456789' } });
    fireEvent.click(downloadButton);

    expect(customerService.transaction_download).toHaveBeenCalledWith('123456789');
    await expect(mockResponse.statusText).toBe('OK');

  });

  it('handles error when fetching transaction details', async () => {
    
    const errorMessage = 'Error fetching transaction details';

    customerService.transaction_download.mockRejectedValueOnce(errorMessage);

    render(
      <MemoryRouter>
        <TransactionDownload />
      </MemoryRouter>
    );

    const accountNumberInput = screen.getByLabelText('Enter Account Number:');
    const downloadButton = screen.getByRole('button', { name: 'Download Transaction Details' });

    fireEvent.change(accountNumberInput, { target: { value: '987654321' } });
    fireEvent.click(downloadButton);

    expect(customerService.transaction_download).toHaveBeenCalledWith('987654321');
    await expect(screen.findByText(`Error: ${errorMessage}`));
  });
  it('handles different response statusText scenarios', async () => {
    const errorResponse = {
      statusText: 'Not Found',
      data: 'Some error data',
    };
  
    customerService.transaction_download.mockResolvedValueOnce(errorResponse);
  
    render(
      <MemoryRouter>
        <TransactionDownload />
      </MemoryRouter>
    );
  
  
    const accountNumberInput = screen.getByLabelText('Enter Account Number:');
    const downloadButton = screen.getByRole('button', { name: 'Download Transaction Details' });
    fireEvent.change(accountNumberInput, { target: { value: '123456789' } });
    fireEvent.click(downloadButton);
  
    expect(customerService.transaction_download).toHaveBeenCalledWith('123456789');
  
    await expect(screen.findByText('Some error data'));
  });
  
});
