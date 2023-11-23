
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Signup from '../Signup';
import { MemoryRouter } from 'react-router-dom';
import { customerService } from '../apiUrls';

jest.mock('../apiUrls', () => ({
  customerService: {
    signup: jest.fn(), 
  },
}));
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('Signup Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  beforeEach(() => {
    navigate = jest.fn();
    require('react-router-dom').useNavigate.mockReturnValue(navigate);
  });

  it('renders Signup form correctly', () => {
    render(<MemoryRouter><Signup /></MemoryRouter>);
    expect(screen.getByRole('heading', { name: /Sign Up/i })).toBeInTheDocument();
    expect( screen.getByLabelText(/Username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/User Role/i)).toBeInTheDocument()
  });

  it('updates state on input change', () => {
    
    render(<MemoryRouter><Signup /></MemoryRouter>); 
    userEvent.type(screen.getByLabelText('Username'), 'testUser');
    expect(screen.getByLabelText('Username')).toHaveValue('testUser');
    userEvent.type(screen.getByLabelText('Email'), 'testEmail@gmail.com');
    expect(screen.getByLabelText('Email')).toHaveValue('testEmail@gmail.com');
    userEvent.type(screen.getByLabelText('Password'), 'password');
    expect(screen.getByLabelText('Password')).toHaveValue('password');
    userEvent.selectOptions(screen.getByLabelText('User Role'), 'customer');
    expect(screen.getByLabelText('User Role')).toHaveValue('customer');
  });

  it('submits form with valid data and navigates to login', async () => {

    const alertMock = jest.spyOn(window, 'alert');
    alertMock.mockImplementation(() => {});

    const mockResponse = { data: 'Successfully Register!' } ;
    customerService.signup.mockResolvedValueOnce(mockResponse);

    render(<MemoryRouter><Signup /></MemoryRouter>);

    userEvent.type(screen.getByLabelText('Username'), 'testUser');
    userEvent.type(screen.getByLabelText('Email'), 'testEmail@gmail.com');
    userEvent.type(screen.getByLabelText('Password'), 'password');
    userEvent.selectOptions(screen.getByLabelText('User Role'), 'customer');

    fireEvent.click(screen.getByRole('button', { name: 'Sign Up' }))

    await waitFor(() => {
      expect(customerService.signup).toHaveBeenCalledWith({
        username: 'testUser',
        email: 'testEmail@gmail.com',
        password: 'password',
        user_role: 'customer',
      });
    });
     expect(screen.getByRole('button', { name: /Sign Up/i })).toBeInTheDocument();
    await waitFor(() => {
    expect(alertMock).toHaveBeenCalledWith('Successfully Register!');
    });
    expect(navigate).toHaveBeenCalledWith('/login');
  });

  it('handles API signup failure', async () => {

    const alertMock=jest.spyOn(window,'alert');
    alertMock.mockImplementation(()=>{});

    const error = 'Signup failed';
    customerService.signup.mockRejectedValueOnce({error});


    render(<MemoryRouter><Signup /></MemoryRouter>);

    const signupButton = screen.getByRole('button', { name: /Sign Up/i });
    fireEvent.click(signupButton);
  
    await waitFor(()=>{
    expect(customerService.signup).toHaveBeenCalled();
    expect(alertMock).toHaveBeenCalledWith({error:error});
    
  });
});
  it('renders a submit button', () => {
    render(<MemoryRouter><Signup /></MemoryRouter>);
    expect(screen.getByRole('button', { name: /Sign Up/i })).toBeInTheDocument();
  });
  
});

