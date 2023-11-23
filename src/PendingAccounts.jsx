import React, { useState, useEffect } from "react";
import { customerService } from './apiUrls';
import { useNavigate,Link } from 'react-router-dom';

const PendingAccounts = () => {
  const [accounts, setAccounts] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchAccounts() {
      try {  
        const response = await customerService.accountdetails();
        console.log(response.data);
        setAccounts(response.data.results);
      } catch (error) {
        alert(error);
      }
    }
    fetchAccounts();
  }, []);

  const handleApproval = async (id) => {
    const data={
      status: 'Approved',
    }
    try {
      const response = await customerService.approve(id, data)
      console.log(response); 
      alert('!Account Approved!')
      navigate('/staff_header');
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className='table-style'>
      <h2>Bank Account Details</h2>
      <table border='1'>
        <thead>
          <tr>
            <th>Account ID</th>
            <th>Account Number</th>
            <th>Account Type</th>
            <th>Balance</th>
            <th>Opening Date</th>
            <th>Account Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {accounts
            .filter(account => account.status === 'Pending')
            .map(account => (
              <tr key={account.id}>
                <td>{account.id}</td>
                <td>{account.account_number}</td>
                <td>{account.account_type}</td>
                <td>{account.account_balance}</td>
                <td>{account.joined_date}</td>
                <td>{account.status}</td>
                <td>
                <button type="button" onClick={() => handleApproval(account.id)}>Approve</button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <Link to="/staff_header"><button>Back</button></Link>
    </div>
  );
};

export default PendingAccounts;
