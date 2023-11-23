import { useState ,useEffect} from "react";
import { customerService } from "./apiUrls";
import{Link} from "react-router-dom";
const  AccountView=()=>{

  const [accounts, setAccounts]=useState([]);
  
  useEffect(() => {
    async function fetchAccounts() {
        try {
            const response = await customerService.account_view();
            console.log(response.data)
            setAccounts(response.data.results);
        } catch (error) {
          alert(error)
        }
    }

    fetchAccounts();
}, []);

  return(
    <div className='table-style'>
    <h2>Account Details</h2>
    <table border='1'>
      <thead>
        <tr>
          <th>id</th>
          <th>Account Number</th>
          <th>Account_Type</th>
          <th>Account_Balance</th>
          <th>Joined Date</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
      
            <tr >
            <td>{accounts.id}</td>
            <td>{accounts.account_number}</td>    
            <td>{accounts.account_type}</td>
            <td>{accounts.account_balance}</td>
            <td>{accounts.joined_date}</td>
            <td>{accounts.status}</td>
            </tr>
           
      </tbody>
      </table>
      <Link to="/customer_header"><button>Back</button></Link>
      </div>

);
}
export default AccountView;
