import UserContext from "./userContext";
import React, { useState } from 'react'

const UserState = (props) => {

    const [userDetails, setUserDetails] = useState([])
    const host = process.env.REACT_APP_HOST_URL;
    const token = localStorage.getItem('token')

    const fetchUserDetails = async ()=>{
      const response = await fetch(`${host}/api/auth/getuserdata`,{
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "auth-token": token
        }
      })
      const json = await response.json();
      setUserDetails(json)
    }
    // console.log(userDetails.profileImg && userDetails.profileImg.imgBuffer);

  return (
    <UserContext.Provider value={{userDetails, setUserDetails, fetchUserDetails}} >
        {props.children}
    </UserContext.Provider>
  )
}

export default UserState
