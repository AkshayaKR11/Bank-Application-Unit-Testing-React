import React, { useState} from 'react';
import { customerService } from './apiUrls';
import { useNavigate,useParams } from 'react-router-dom';
const UpdateUser=()=>
{
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const {user_id}=useParams()
    const navigate = useNavigate();
    const handleSubmit = async (id,e) => {
      e.preventDefault();
        const data={username: username,
          email: email,}
          try {
            const response = await customerService.update(id,data)
            alert('Updated Successfully!')
            navigate('/manager_header');
          } catch (error) {
           alert(error);
          }

         };

    return(
        <div className="account-container content-view">
        <h2>Edit Profile</h2>
        <form onSubmit={(e) => handleSubmit(user_id,e)}>
          <div className="input-container">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" name="username" placeholder={`Username`} required value={username} onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div className="input-container">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" placeholder={`Email`}  required value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <button type="submit">Apply</button>
        </form>
      </div>
    );
}
export default UpdateUser;