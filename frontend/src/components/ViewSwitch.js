import React from 'react'
import './AvalableHotel.css'

const ViewSwitch = (props) => {

  function onChange() {
    const radio2 = document.getElementById('view-switch2')
    if(radio2 && radio2.checked){
      props.setSwitchState(false)
    }else{
      props.setSwitchState(true)
    }
  }

  return (
    <div className="sort-icon">
        <input id='view-switch1' type='radio' name='view-switch' defaultChecked value='main-view' onChange={onChange} />
        <label htmlFor='view-switch1' className='label1'>
        <i className="bi viewswitch-icon bi-window-dock"></i></label>
        <input id='view-switch2' type='radio' name='view-switch' value='list-view' onChange={onChange} />
        <label htmlFor='view-switch2' className='label2'>
        <i className="bi viewswitch-icon bi-list-ul"></i></label>
        </div>
  )
}

export default ViewSwitch