import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from '../Login';
import { MemoryRouter } from 'react-router-dom';
import { customerService } from '../apiUrls';

jest.mock('../apiUrls', () => ({
  customerService: {
    login: jest.fn(),
  },
}));
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('LoginPage Component', () => {
  let navigate;
  beforeEach(() => {
    jest.clearAllMocks();
  });
  beforeEach(() => {
     navigate = jest.fn();
    require('react-router-dom').useNavigate.mockReturnValue(navigate);
  });

  it('renders Login form correctly', () => {
    render(<MemoryRouter><Login /></MemoryRouter>);
    expect(screen.getByRole('heading', { name: /Login/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/Username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Login/i })).toBeInTheDocument();
  });

  it('updates state on input change', () => {
    render(<MemoryRouter><Login /></MemoryRouter>);
    userEvent.type(screen.getByLabelText('Username'), 'testUser');
    expect(screen.getByLabelText('Username')).toHaveValue('testUser');
    userEvent.type(screen.getByLabelText('Password'), 'password');
    expect(screen.getByLabelText('Password')).toHaveValue('password');
  });

  it('submits form with valid data and navigates to the appropriate header', async () => {
    const alertMock=jest.spyOn(window,'alert');
    alertMock.mockImplementation(()=>{});
    customerService.login.mockResolvedValueOnce({
      data: {
        access: 'testAccessToken',
        user_role: 'customer',
      },
    });

    render(<MemoryRouter><Login /></MemoryRouter>);

    userEvent.type(screen.getByLabelText('Username'), 'testUser');
    userEvent.type(screen.getByLabelText('Password'), 'password');

    fireEvent.click(screen.getByRole('button', { name: /Login/i }));

    await waitFor(() => {
      expect(customerService.login).toHaveBeenCalledWith({
        username: 'testUser',
        password: 'password',
      });
    });

    expect(screen.getByRole('button', { name: /Login/i })).toBeInTheDocument();
    await waitFor(() => {
    expect(alertMock).toHaveBeenCalledWith('Logged in Successfully');
    });
    expect(navigate).toHaveBeenCalledWith('/customer_header');
  });

  it('submits form with valid data and navigates to the wrong header', async () => {
    customerService.login.mockResolvedValueOnce({
      data: {
        access: 'testAccessToken',
        user_role: 'sales',
      },
    });

    render(<MemoryRouter><Login /></MemoryRouter>);

    userEvent.type(screen.getByLabelText('Username'), 'testUser');
    userEvent.type(screen.getByLabelText('Password'), 'password');

    fireEvent.click(screen.getByRole('button', { name: /Login/i }));

    await waitFor(() => {
      expect(customerService.login).toHaveBeenCalledWith({
        username: 'testUser',
        password: 'password',
      });
    });

    expect(screen.getByRole('button', { name: /Login/i })).toBeInTheDocument();
    await waitFor(() => {
    expect(navigate).toHaveBeenCalledWith('/login');
  });
});

  it('handles login failure', async () => {
    const error = new Error('Login failed');
    customerService.login.mockRejectedValueOnce(error);

    render(<MemoryRouter><Login/></MemoryRouter>);

    userEvent.type(screen.getByLabelText('Username'), 'testUser');
    userEvent.type(screen.getByLabelText('Password'), 'wrongpassword');

    fireEvent.click(screen.getByRole('button', { name: /Login/i }));

    await waitFor(() => {
      expect(customerService.login).toHaveBeenCalled();
      expect(screen.getByRole('button', { name: /Login/i })).toBeInTheDocument();
      expect(screen.queryByText(/Logged in Successfully/i)).not.toBeInTheDocument();
    });
  });
});
