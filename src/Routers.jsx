import {useRoutes} from 'react-router-dom'
import Login from './Login'
import Signup from './Signup';
import Account from './Account';
import Transaction from './Transaction';
import ViewBankAccounts  from './ViewBankAccounts';
import ViewUsers from './ViewUsers';
import TransactionDetails from './TransactionDetails';
import CustomerHeader from './CustomerHeader';
import Footer from './Footer';
import StaffHeader from './StaffHeader';
import ManagerHeader from './ManagerHeader';
import ViewStaff from './ViewStaff';
import PendingAccounts from './PendingAccounts';
import TransactionDownload from './TransactionDownload';
import UpdateUser from './UpdateUsers';
import ClosedAccounts from './ClosedAccounts';
import TransactionView from './TransactionView';
import HomeHeader from './HomeHeader';
import AccountView from './AccountView';
import Logout from './Logout';
export default function Routers(){
    let element=useRoutes([
        {
          path:"/login",element:<Login/>
      
        },
        {
          path:"/footer",element:<Footer/>
      
        },
        {
          path:"/transaction_view",element:<TransactionView/>
      
        },
        {
          path:"/transaction_download",element:<TransactionDownload/>
      
        },
        {
          path:"/customer_header",element:<CustomerHeader/>
        },
        {
          path:"/pending_accounts",element:<PendingAccounts/>
        },
        {
            path:"/signup",element:<Signup/>
        },
        {
          path:"/view_bank_accounts",element:<ViewBankAccounts/>
        },
        {
          path:"/transaction",element:<Transaction/>
        },
        {
          path:"/update_user/:user_id",element:<UpdateUser/>
      
        },
        {
          path:"/transactiondetails",element:<TransactionDetails/>
        },
        {
          path:"/view_user",element:<ViewUsers/>
        },
        {
          path:"/view_staff",element:<ViewStaff/>
        },
        {
          path:"/staff_header",element:<StaffHeader/>
        },
        {
          path:"/manager_header",element:<ManagerHeader/>
        },
        {
          path:"/home_header",element:<HomeHeader/>
        },
        {
          path:"/closed_account",element:<ClosedAccounts/>
        },
        {
          path:"/account_view",element:<AccountView/>
        },
        {
          path:"/logout",element:<Logout/>
        },
        {
          path:"/account",element:<Account/>
      
        }])
        
        return (
          
            element
          );
        
  }