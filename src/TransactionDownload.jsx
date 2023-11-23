import { useState } from "react";
import { customerService } from "./apiUrls";
import { Link } from "react-router-dom";

const TransactionDownload=()=>{
    const [account_number,setAccountNumber]=useState('');
   
    const handleSubmit =async(e,account_number)=>{   
       e.preventDefault();
        try{
            const response = await customerService.transaction_download(account_number)
              console.log(response);
              if (response.statusText==="OK") {
                const blob = new Blob([response.data], { type: 'text/csv' });   
                const link = document.createElement('a');
                link.href = window.URL.createObjectURL(blob);
                link.download = `transaction_${account_number}.csv`;
                link.click();
              }
            } catch (error) {
             alert(error);
            }
    };

return(
    <div className="login-container content-view">
    <form method="post" onSubmit={(e) => handleSubmit(e,account_number)}>
      <label>
        Enter Account Number:
        <input type="text" required value={account_number} onChange={(e)=>setAccountNumber(e.target.value)}/>
      </label>
      <button type="submit">Download Transaction Details</button>
    </form><br></br>
    <Link to="/staff_header"><button>Back</button></Link>
  </div>
  
);
}
export default TransactionDownload;