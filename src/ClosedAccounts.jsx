import React, { useState, useEffect } from "react";
import { customerService } from './apiUrls';
import{Link} from "react-router-dom";
const ClosedAccounts = () => {
    const [accounts, setAccounts] = useState([]);
    useEffect(() => {
      async function fetchAccounts() {
        try {  
          const response = await customerService.accountdetails();
          setAccounts(response.data.results);
        } catch (error) {
         alert(error);
        }
      }
      fetchAccounts();
    }, []);
    return (
        <div className='table-style'>
          <h2>Closed Account Details</h2>
          <table border='1'>
            <thead>
              <tr>
                <th>Account ID</th>
                <th>Account Number</th>
                <th>Account Type</th>
                <th>Balance</th>
                <th>Opening Date</th>
                <th>Account Status</th>
              </tr>
            </thead>
            <tbody>
              {accounts
                .filter(account => account.status === 'Closed')
                .map(account => (
                  <tr key={account.id}>
                    <td>{account.id}</td>
                    <td>{account.account_number}</td>
                    <td>{account.account_type}</td>
                    <td>{account.account_balance}</td>
                    <td>{account.joined_date}</td>
                    <td>{account.status}</td>
                  </tr>
                ))}
            </tbody>
          </table>
          <Link to="/staff_header"><button>Back</button></Link>
        </div>
      );
    };
    
    export default ClosedAccounts;
