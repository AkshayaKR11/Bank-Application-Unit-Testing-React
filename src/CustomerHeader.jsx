import{Outlet,Link} from "react-router-dom";  
const CustomerHeader=()=>{

    return (
        
        <div className={"HeaderBackground-color"}>
          <nav>
           
                <Link to="/Account"><button>Create Account</button></Link>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
                <Link to="/Transaction"><button>Transaction</button></Link>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
                <Link to="/transaction_view"><button>Transaction History</button></Link>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                <Link to="/transaction_download"><button>Download Transaction</button></Link>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                <Link to="/account_view"><button>Account Details</button></Link>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                <Link to="/logout"><button>Logout</button></Link>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
          </nav>
    
          <Outlet />
          </div>
        
      )
    };
export default CustomerHeader;