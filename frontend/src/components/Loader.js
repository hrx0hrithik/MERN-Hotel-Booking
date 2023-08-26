import React from 'react'
import './Loader.css'
import spinner from '../assets/images/Spinner.gif'

const Loader = () => {
  return (
    <div className="loader-container">
    <div className="loader">
      <img src={spinner} alt="Loading" />
      <p className='loading-text'>Loading...</p>
    </div>
  </div>
  )
}

export default Loader
