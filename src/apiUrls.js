import { axiosPrivate } from './Interceptor';
const login = (data) => {
    return axiosPrivate.post('login/',data);
  };
  const signup=(data)=>{
    console.log(data)
    return axiosPrivate.post('user_register/',data);
  };
  const account=(data)=>{
    console.log(data)
    return axiosPrivate.post('account/creation/',data);
  };
  const accountdetails=()=>{
    return axiosPrivate.get('account/list/')
  }
  const viewUsers=()=>{
    return axiosPrivate.get('userview/')
  }
  const deposit=(data)=>{
    console.log(data)
    return axiosPrivate.post('transaction/deposit/',data)
  }
  const url=(url)=>{
    return axiosPrivate.get(url)
  }
  const withdraw=(data)=>{
    console.log(data)
    return axiosPrivate.post('transaction/withdraw/',data)
  }
  const approve=(id,data)=>{
    console.log(data)
    return axiosPrivate.patch(`account/approveaccount/${id}`,data)
  }
  const transaction_download=(account_number)=>{
    console.log(account_number)
    return axiosPrivate.get(`/transaction/transaction_history/${account_number}`)
  }
  const transaction_view=()=>{
    return axiosPrivate.get(`/transaction/transaction_view/`)
  }
  const account_view=()=>{
    return axiosPrivate.get(`account/account_view/`)
  }
  const update=(user_id,data)=>{
    console.log(data)
    return axiosPrivate.patch(`customer_update/${user_id}`,data)
  }
  const transaction_details=()=>{
    return axiosPrivate.get(`transaction/transaction`)
  }
  const customerService = {
    signup,
    login,
    account,
    accountdetails,
    viewUsers,
    deposit,
    withdraw,
    approve,
    transaction_download,
    update,
    transaction_view,
    account_view,
    transaction_details,
    url
  };
  export {customerService};

