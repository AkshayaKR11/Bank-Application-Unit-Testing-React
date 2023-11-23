import React from 'react';
import { render, screen, fireEvent, waitFor,act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Account from '../Account';
import { customerService } from '../apiUrls';
import { MemoryRouter,BrowserRouter } from 'react-router-dom';

jest.mock('../apiUrls', () => ({
  customerService: {
    account: jest.fn(),
  },
}));
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));
jest.mock()


describe('Account Component', () => {

  beforeEach(() => {
    navigate = jest.fn();
    require('react-router-dom').useNavigate.mockReturnValue(navigate);
  });

  it('renders account creation form correctly', () => {
    render(<MemoryRouter><Account /></MemoryRouter>);
    expect(screen.getByRole('heading', { name: /Account Create/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/Account Type/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Create Account/i })).toBeInTheDocument();
  });

  it('submits the account creation form with valid data', async () => {

    const alertMock = jest.spyOn(window, 'alert');
    alertMock.mockImplementation(() => {});

    const mockResponse = {
      data: { message: 'Account created Successfully' },
    };

    customerService.account.mockResolvedValueOnce(mockResponse);

    render(<MemoryRouter><Account /></MemoryRouter>);

    const accountTypeSelect = screen.getByLabelText('Account Type:');
    const createAccountButton = screen.getByRole('button', { name: /Create Account/i });

    fireEvent.change(accountTypeSelect, { target: { value: 'salary' } });
    fireEvent.click(createAccountButton);

    await waitFor(() => {
      expect(customerService.account).toHaveBeenCalledWith({ account_type: 'salary' });
      expect(alertMock).toHaveBeenCalledWith('Account created Successfully');
    });
    expect(navigate).toHaveBeenCalledWith('/customer_header');
   
  });
  

  it('handles account creation form submission error', async () => {
    const alertMock=jest.spyOn(window,'alert');
    alertMock.mockImplementation(()=>{});

    const errorMessage = 'Account creation failed';
    customerService.account.mockRejectedValueOnce(errorMessage);
    render(<MemoryRouter><Account /></MemoryRouter>);
    await act(async () => {
    userEvent.selectOptions(screen.getByLabelText(/Account Type/i), 'salary');

    fireEvent.click(screen.getByRole('button', { name: /Create Account/i }));
  
    await waitFor(()=>{
      expect(customerService.account).toHaveBeenCalled();
      expect(alertMock).toHaveBeenCalledWith(errorMessage);
    });
  });
});
});
