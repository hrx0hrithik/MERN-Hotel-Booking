import "./Navbar.css"
import React, { useContext } from 'react';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import userContext from "../context/userContext";

const Navbar = (props) => {

  const context = useContext(userContext)
  const { setUserDetails } = context;

  let history = useNavigate();

  const handleLogout = ()=>{
    localStorage.clear()
    setUserDetails([])
    props.showAlert('Loged-out Successfully')
    history('/');
  }
  const localUsername = localStorage.getItem('username')

  let username = localUsername && localUsername ? localUsername.split(' ')[0] : '';

  let location = useLocation();
  

  return (
<nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top shadow-sm bg-body-tertiary rounded">
  <div className="container-fluid">
    <div className="navbar-brand fw-bolder fs-4"> <span style={{color: " #ff6d38"}} > Go</span><span style={{color: "#2776db"}} >YOLO</span> </div>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className={`tabs-btn mx-2 ${location.pathname==="/"? "active-tab" : ""}`} aria-current="page" to="/"><i className="bi nav-icon bi-house-fill"></i> Home</Link>
        </li>
        <li className="nav-item">
          <Link className={`tabs-btn mx-2 ${location.pathname==="/about"? "active-tab" : ""}`} aria-current="page" to="/about"><i className="bi nav-icon bi-credit-card-2-front-fill"></i> About</Link>
        </li>
        
      </ul>
      { !localStorage.getItem('token')? <div className='d-flex'>
        <ul className="navbar-nav me-2 mb-2 mb-lg-0">
      <li className="nav-item dropdown me-2">
          <div className="btn btn-outline-primary dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Login / Signup
          </div>
          <ul className="dropdown-menu me-2">
            <li> <Link className="dropdown-item" to='/login' role="button">Login</Link></li>
            <li><hr className="dropdown-divider"/></li>
            <li><Link className="dropdown-item" to='/signup' role="button">Signup</Link></li>
          </ul>
        </li>
        </ul>
        </div> : 
        <div className='d-flex'>
        <ul className="navbar-nav me-2 mb-2 mb-lg-0">
          <li className="nav-item dropdown me-2">
            <div className="btn btn-outline-primary dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false" >
              Hey {username}
              </div>
          <ul className="dropdown-menu me-2">
            <li> <Link  className="dropdown-item" to='/userprofile'> Profile</Link></li>
            <li><hr className="dropdown-divider"/></li>
            <li onClick={handleLogout} className="dropdown-item">Logout</li>
          </ul>
          </li>
        </ul>
        </div>
        
         }
    </div>
  </div>
</nav>

  )
}

export default Navbar