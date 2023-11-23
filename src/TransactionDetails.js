import React, { useState, useEffect } from "react";
import { customerService } from "./apiUrls";

const TransactionDetails = () => {
  const [transactions, setTransactions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  useEffect(() => {
    async function fetchTransactions() {
      try {
        const response = await customerService.transaction_details();
        setTransactions(response.data.members);
      } catch (error) {
        alert(error);
      }
    }

    fetchTransactions();
  }, []);

  const filteredTransactions = transactions.filter(transaction =>
    transaction.transaction_type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = event => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className='table-style'>
      <h2>Transaction Details</h2>
      <div>
      <input
        type="text"
        placeholder="Search Transaction Type"
        value={searchTerm}
        onChange={handleSearch}
        style={{ marginRight: '5px' }}
      />
      </div>
      <table border='1'>
        <thead>
          <tr>
             <th>#</th>
            
            <th>Transaction Type</th>
            <th>Amount</th>
            <th>Transaction Date</th>
          </tr>
        </thead>
        <tbody>
          {filteredTransactions.map((transaction,index) => (
            <tr key={transaction.id}>
              <td>{index + 1}</td>            
              <td>{transaction.transaction_type}</td>
              <td>{transaction.transaction_amount}</td>
              <td>{transaction.transaction_date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionDetails;
