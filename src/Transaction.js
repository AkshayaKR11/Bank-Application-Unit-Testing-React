import React, { useState } from "react";
import { customerService } from "./apiUrls"; 
import { useNavigate } from "react-router-dom";

export const showAlert = (message) => {
  alert(message);
}; 

const Transaction = () => {
  const [amount, setAmount] = useState(0);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
        amount: amount
    };
    console.log(typeof amount);
    console.log(data);
    try {
      const response = await customerService.deposit(data);
      console.log(response);
      showAlert('Deposited Successfully')
      navigate('/customer_header');
    } catch (error) {
      console.log(error);
      showAlert(`${error.response.data.message}`)
    }
  };
  const withdrawButton = async (e) => {
    e.preventDefault();
    const data = {
        amount: amount
    };
    console.log(typeof amount);
    console.log(data);
    try {
      const response = await customerService.withdraw(data);
      console.log(response);
      alert('Withdrew Successfully')
      navigate('/customer_header');
    } catch (error) {
      console.log(error);
      alert(`${error.response.data.message}`)
    }
  };

  return (
    <div className="account-container content-view">
      <h2>Bank Account</h2>
      <div>
        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <label htmlFor="amount">Amount</label>
            <input
              type="number"
              id="amount"
              name="amount"
              placeholder="Amount"
              required
              min="1"
              step="1"
              value={amount}
              onChange={(e) =>setAmount(e.target.value)}
            />
          </div>
          <button type="submit">Deposit</button>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
          <button type="button" onClick={withdrawButton}>Withdraw</button>
          <br />
        </form>
      </div>
    </div>
  );
};

export default Transaction;
