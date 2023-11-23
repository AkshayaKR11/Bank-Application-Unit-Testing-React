import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { customerService } from './apiUrls';
const Account=()=>{
const [account_type,setAccountType]=useState('');
const navigate = useNavigate();
const handleSubmit= async(e)=> {
    e.preventDefault();
    const data={
        account_type:account_type,
    }
    console.log(account_type)
    try{
    const response = await customerService.account(data)
    console.log(response);
    alert(`${response.data.message}`)
    navigate('/customer_header');
      
    } catch (error) {
      console.log();
      alert(error)
    }
     
};

    return (
            <div className="account-container content-view">
            <h2>Account Create</h2>
            <form onSubmit={handleSubmit}>
                <div className="input-container">
                <label htmlFor="accountType">Account Type:</label>
                <select id="accountType" name="accountType" required value={account_type} onChange={(e)=>setAccountType(e.target.value)}>
                    <option value="">Select an account type</option>
                    <option value="savings">Savings</option>
                    <option value="salary">Salary</option>
                    <option value="fixed">Fixed</option>
                </select>
            </div>
                <button type="submit">Create Account</button>
            </form>
        </div>
        );
    }

export default Account;