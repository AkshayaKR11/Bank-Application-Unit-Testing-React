import  { useEffect } from "react";
import { useNavigate } from 'react-router-dom';

function Logout() {
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.removeItem('authTokens');
        navigate('/home_header');
    }, [navigate]);

    return null; 
}

export default Logout;
