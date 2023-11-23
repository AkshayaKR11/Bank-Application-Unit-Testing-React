import { useState ,useEffect} from "react";
import { customerService } from "./apiUrls";
import{Link} from "react-router-dom";
const  TransactionView=()=>{
    const [transactions, setTransactions]=useState([]);
    useEffect(() => {
      async function fetchTransactions() {
          try {
            const response = await customerService.transaction_view()
            const sortedTransactions = response.data.transactions.sort((a, b) => {
              return new Date(b.transaction_date) - new Date(a.transaction_date);
            });
            console.log(response);
              setTransactions(sortedTransactions);
          } catch (error) {
              alert(error)
          }
      }
  
      fetchTransactions();
  }, []);
  return(
    <div className='table-style'>
    <h2>Transaction Details</h2>
    <table border='1'>
      <thead>
        <tr>
          <th>#</th>
          <th>id</th>
          <th>Transaction Type</th>
          <th>Amount</th>
          <th>Transaction Date</th>
        </tr>
      </thead>
      <tbody>
      {transactions.map((transaction,index) => (
                    <tr key={transaction.id}>
                      <td>{index+1}</td>
                        <td>{transaction.id}</td>
                        <td>{transaction.transaction_type}</td>
                        <td>{transaction.transaction_amount}</td>
                        <td>{transaction.transaction_date}</td>
                    </tr>
                ))}
           
      </tbody>
      </table>
      <Link to="/customer_header"><button>Back</button></Link>
      </div>

);
}
export default TransactionView;
