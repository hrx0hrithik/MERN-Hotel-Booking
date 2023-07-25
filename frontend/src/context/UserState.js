import UserContext from "./userContext";
import React, { useState } from 'react'

const UserState = (props) => {

    const [userDetails, setUserDetails] = useState([])

  return (
    <UserContext.Provider value={{userDetails, setUserDetails}} >
        {props.children}
    </UserContext.Provider>
  )
}

export default UserState
