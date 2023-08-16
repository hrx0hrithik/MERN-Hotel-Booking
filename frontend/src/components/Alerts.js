import React from 'react'

const Alerts = (props) => {

  return (
    <div className={`toast align-items-center border-0 p-1 z-3 ${props.alert.show ? 'show': ''}`} style={{position: "fixed", top: "90px", left: "20px", backgroundColor: "#ff6d38", color: "white", boxShadow: "rgb(38, 57, 77) 0px 20px 30px -10px" }} role="alert" aria-live="assertive" aria-atomic="true">
    <div className="d-flex">
      <div className="toast-body fs-6 text-center">   
        {props.alert.msg}
      </div>
      <button type="button" className="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
    </div>
  </div>
  )
}

export default Alerts
