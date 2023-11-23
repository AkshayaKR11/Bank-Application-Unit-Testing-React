import React, { useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { customerService } from './apiUrls';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const data={username: username,
      password: password,}
    try {
      const response = await customerService.login(data);
      console.log(response)
      const token=response.data.access 
      const user_role=response.data.user_role
      console.log(token)
      localStorage.setItem("authTokens",JSON.stringify(token))  
      const loginMapping={
        "customer":"/customer_header",
        "staff":"/staff_header",
        "manager":"/manager_header",
      };
      alert('Logged in Successfully')
      navigate(loginMapping[user_role]||"/login");
     
    }
    catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="login-container content-view">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div className="input-container">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="input-container">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button> &nbsp;
      </form>
    </div>
  );
};

export default LoginPage;
