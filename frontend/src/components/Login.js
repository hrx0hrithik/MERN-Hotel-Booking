import React, { useContext, useState } from 'react';
import {Link, useNavigate} from "react-router-dom"
import './Home.css'
import userContext from '../context/userContext';

function Login(props) {

    const [credentials, setCredentials] = useState({email: "", password: ""})
    let history = useNavigate();
    const context = useContext(userContext)
    const { setUserDetails } = context
    const host = process.env.REACT_APP_HOST_URL;

    const handleSubmit = async (e)=>{
        e.preventDefault();
        const response = await fetch(`${host}/api/auth/login`,
         {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({email: credentials.email, password: credentials.password})
          });
          //authToken recived in json
          const json = await response.json();
          
          if (json.success){
            // Save the auth token and redirect
            localStorage.setItem('token', json.authToken);
            const response = await fetch(`${host}/api/auth/getuserdata`, 
            {
              method: "POST",
              headers:{
                "Content-Type": "application/json",
                "auth-token": json.authToken
              }
            });
            const userData = await response.json();
            setUserDetails(userData);
            history(-1)
            props.showAlert('Login Successfull')
          }else{
            alert("Invalid Credentials");
          }
    }
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
      };
      console.log(history)
  return (
    <div className="home" style={{marginTop: "-15px"}}>
    <div className="container p-2" style={{ marginTop: "75px" }}>
      <h1 className='heading-login fw-bolder'>Login</h1>
      <div className="container login-div border shadow p-4 mb-5 bg-body-tertiary rounded position-relative">
      <form className="" onSubmit={handleSubmit}>
      <Link to="/" type="button" className="btn-close position-absolute top-0 end-0 m-3" aria-label="Close" ></Link>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address:</label>
    <input type="email" className="form-control" id="email" name='email' minLength={10} onChange={onChange} aria-describedby="emailHelp" required/>
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password:</label>
    <input type="password" className="form-control" name='password' minLength={5} onChange={onChange} id="password" required/>
  </div>
  <button type="submit" className="btn btn-primary">Login</button>
</form>
      <div className='mt-3 mb-0 text-secondary'> Not having an account <Link to='/signup'> SignUp</Link> here</div>
      </div>
    </div>
    </div>
  )
}

export default Login
