import { useState ,useEffect} from "react";
import { customerService } from './apiUrls';
import { useNavigate, Link } from "react-router-dom";
  const  ViewBankAccounts=()=>{
    const [accounts, setAccounts]=useState([]);
    const [nextLink,setNextLink]=useState('');
    const [previousLink,setPreviousLink]=useState('');
    const navigate = useNavigate();
    useEffect(() => {
      async function fetchAccounts() {
          try {
            const response = await customerService.accountdetails()
              console.log(response.data.results)
              setAccounts(response.data.results);
              setNextLink(response.data.next);
              setPreviousLink(response.data.previous);
          } catch (error) {
            alert(error)
          }
      }
  
      fetchAccounts();
  }, []);
  const handlePages=async (url)=>{
    try{
      const response = await customerService.url(url)
      console.log(response)
      setAccounts(response.data.results);
      setNextLink(response.data.next);
      setPreviousLink(response.data.previous);
    } catch (error) {
      alert(error)
  }
  }

  const handleClose = async (id) => {
    const data={
      status: 'Closed',
    }
    try {
      const response = await customerService.approve(id, data)
      console.log(response)
      alert('!Account Closed!')
      navigate('/staff_header');
    } catch (error) {
      alert(error)
    }
  };
return(
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
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
          {accounts
     .filter(account => account.status === 'Approved')
    .map((account)=> (
                        <tr key={account.id}>    
                            <td>{account.id}</td>
                            <td>{account.account_number}</td>
                            <td>{account.account_type}</td>
                            <td>{account.account_balance}</td>
                            <td>{account.joined_date}</td>
                            <td>{account.status}</td>
                            <td>
                            <button type="button" onClick={() => handleClose(account.id)}>Close</button></td>
                        </tr>
                    ))}    
          </tbody>
      </table>
      <tr>
      <button type='button' onClick={()=>handlePages(previousLink)}>Previous</button>
        <button type='button' onClick={()=>handlePages(nextLink)}>Next</button><br></br><br></br></tr>
                   
      <Link to="/staff_header"><button>Back</button></Link>
      
      </div>
);
}
export default ViewBankAccounts;