import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { customerService } from './apiUrls';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user_role, setUserRole] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data={username: username,
      email: email,
      password: password,
      user_role: user_role}
    
      try {
      const response = await customerService.signup(data)
      console.log(response);
      alert(`${response.data}`)
      navigate('/login');
    } catch (error) {
      alert(error)
    }
  };

  return (
    <div className="account-container content-view">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label htmlFor="username">Username</label>
          <input type="text" id="username" name="username" required value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div className="input-container">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="input-container">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div className="input-container">
          <label htmlFor="user-role">User Role</label>
          <select id="user-role" name="user-role" required value={user_role} onChange={(e) => setUserRole(e.target.value)}>
            <option value="">Select a user role</option>
            <option value="customer">Customer</option>
            <option value="manager">Manager</option>
            <option value="staff">Staff</option>
          </select>
        </div>
        <button type="submit" name='Sign Up'>Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;
