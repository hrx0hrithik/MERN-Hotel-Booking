import "./Navbar.css"
import React, { useContext, useEffect, useState } from 'react';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import userContext from "../context/userContext";

const Navbar = (props) => {

  const context = useContext(userContext)
  const { setUserDetails } = context;

  const [mainNavbar, setMainNavbar] = useState(true)

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
  const urlPattern = /^\/avalablehotels\/hoteldetails\//;

  useEffect(()=>{

    if (urlPattern.test(location.pathname)) {
      setMainNavbar(false)
    }else{
      setMainNavbar(true)
    }
    // eslint-disable-next-line
  },[location])

  return (
    <>
<nav className={`navbar navbar-expand-md navbar-light bg-light ${!mainNavbar? "hide-navbar": ""}`} >
  <div className="container-fluid ">
    <div className="navbar-brand fw-bolder fs-4"> <span style={{color: " #ff6d38"}} > Go</span><span style={{color: "#2776db"}} >YOLO</span> </div>
    <div className="navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav ">
        <li className="nav-item">
          <Link className={`tabs-btn mx-2 ${location.pathname==="/"? "active-tab" : ""}`} aria-current="page" to="/"><i className="bi nav-icon bi-house-fill"></i> Home</Link>
        </li>
        <li className="nav-item">
          <Link className={`tabs-btn mx-2 ${location.pathname==="/about"? "active-tab" : ""}`} aria-current="page" to="/about"><i className="bi nav-icon bi-credit-card-2-front-fill"></i> About</Link>
        </li>
        <li className="nav-item">
          <Link className={`tabs-btn mx-2 mobile-nav-btn `} aria-current="page" to="/"><i className="bi nav-icon bi-airplane-fill"></i> Flight</Link>
        </li>
        <li className="nav-item">
          <Link className={`tabs-btn mx-2 mobile-nav-btn ${location.pathname==="/login" || location.pathname==="/userprofile" ? "active-tab" : ""}`} aria-current="page" to={`${localStorage.token ? '/userprofile' : '/login'}`}><i className="bi nav-icon bi-person-fill"></i> Profile</Link>
        </li>
        
      </ul>
      { !localStorage.getItem('token')? 
        <ul className="navbar-nav login-btn-class">
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
        </ul>: 
        <ul className="navbar-nav login-btn-class me-2 mb-2 mb-lg-0">
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
        
         }
    </div>
  </div>
</nav>
</>
)}

export default Navbar