import { useState ,useEffect} from "react";
import { customerService } from "./apiUrls";
import{Link} from "react-router-dom"; 

const  ViewUsers=()=>{
  const [users, setUsers]=useState([]);
  useEffect(() => {
    async function fetchUsers() {
        try {
            const response = await  customerService.viewUsers();
            console.log(response.data)
               setUsers(response.data.results);
        } catch (error) {
            alert(error)
        }
    }

    fetchUsers();
}, []);


    return(
        <div className='table-style'>
        <h2>User Details</h2>
        <table border='1'>
          <thead>
            <tr>
               <th>#</th>
              <th>User ID</th>
              <th>User Name</th>
              <th>Email</th>
              <th>User Type</th>
            </tr>
          </thead>
          <tbody>
          {users
    .filter(user => user.user_role === 'customer')
          .map((user,index) => (
                        <tr key={user.id}>
                           <td>{index+1}</td>
                            <td>{user.id}</td>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>{user.user_role}</td>
                            <td><Link to={`/update_user/${user.id}`}><button>Update User</button>
</Link></td>
                        </tr>
                    ))}
               
          </tbody>
          </table>
          <Link to="/staff_header"><button>Back</button></Link>
          </div>
    );
}
export default ViewUsers;