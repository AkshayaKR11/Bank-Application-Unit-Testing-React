import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter,Routes, Route } from 'react-router-dom';
import UpdateUser from '../UpdateUsers';
import { customerService } from '../apiUrls';

jest.mock('../apiUrls', () => ({
  customerService: {
    update: jest.fn(),
  },
}));

describe('UpdateUser Component', () => {
  it('submits user updates successfully', async () => {

   const alertMock=jest.spyOn(window,'alert');
   alertMock.mockImplementation(()=>{});
    
    const mockUserId = '70'; 
    render(
        <MemoryRouter initialEntries={[`/update_user/${mockUserId}`]}>
          <Routes>
            <Route path="/update_user/:user_id" element={<UpdateUser />} />
          </Routes>
        </MemoryRouter>
      );

    const usernameInput = screen.getByLabelText(/Username/i);
    const emailInput = screen.getByLabelText(/Email/i);
    const applyButton = screen.getByRole('button', { name: /Apply/i });

    fireEvent.change(usernameInput, { target: { value: 'NewUsername' } });
    fireEvent.change(emailInput, { target: { value: 'new@example.com' } });
    fireEvent.click(applyButton);

    expect(customerService.update).toHaveBeenCalledWith(mockUserId, {
      username: 'NewUsername',
      email: 'new@example.com',
    });

    await waitFor(() => {
        expect(alertMock).toHaveBeenCalledWith('Updated Successfully!');
        alertMock.mockRestore();
    });
  });
});
