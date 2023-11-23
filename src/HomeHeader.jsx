import{Outlet,Link} from "react-router-dom";  
const HomeHeader=()=>{

    return (
        
        <div className={"HeaderBackground-color"}>
          <nav>
           
                <Link to="/login"><button>Login</button></Link>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
                <Link to="/signup"><button>Sign up</button></Link>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                <Link to="/about_us"><button>About Us</button></Link>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
                <Link to="/contact"><button>Contact</button></Link>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
          </nav>
    
          <Outlet />
          </div>
        
      )
    };
export default HomeHeader;