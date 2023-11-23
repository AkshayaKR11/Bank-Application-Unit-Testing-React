import{Outlet,Link} from "react-router-dom";  
const StaffHeader=()=>{

    return (
        
        <div className={"HeaderBackground-color"}>
          <nav>
                <Link to="/view_user"><button>View Customers</button></Link>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                <Link to="/pending_accounts"><button>Account Requests</button></Link>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                <Link to="/view_bank_accounts"><button>View Accounts</button></Link>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  
                <Link to="/TransactionDetails"><button>Transaction History</button></Link>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                <Link to="/transaction_download"><button>Download Transaction</button></Link>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                <Link to="/closed_account"><button>Closed Accounts</button></Link>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                <Link to="/logout"><button>Logout</button></Link>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
          </nav>
    
          <Outlet />
          </div>
        
      )
    };
export default StaffHeader;