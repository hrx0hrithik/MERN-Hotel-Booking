import React, { useContext, useEffect, useState } from 'react'
import './AvalableHotel.css'
import HotelItem from '../components/HotelItem'
import hotelContext from '../context/hotelContext';
import reservationContext from '../context/reservationContext';
import { useLocation, useNavigate } from 'react-router-dom';
import ViewSwitch from './ViewSwitch';

function AvableHotel() {

  const history = useNavigate()
  const [ switchState, setSwitchState ] = useState(true)

  const context = useContext(hotelContext, reservationContext);
  const { loading, hotels, getAllHotels, reservation} = context;
  useEffect(() => {
      getAllHotels(reservation);
    
    // eslint-disable-next-line
  },[])

    // Automatically scrolls to top whenever pathname changes
    const { pathname } = useLocation();

    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);

    function handleClick() {
      history('/')
    }

    let contentStyle
    if (!switchState){
      contentStyle = {
        bottom: "-10px",
        marginBottom: "65px",
        marginTop: '10px'
      }
    }
    if (loading) {
      return <h3 style={{ margin: "100px auto"}}>Loading...</h3>;
    }

  return (
    <>
    <div className="backcolor pt-1">
    <i className="bi bi-arrow-left-short" onClick={handleClick}></i>
    <h2 className='hotel-mob-heading'>{hotels.length === 0 ? 'No Hotels Avalable' : "List of the Hotels Avalable"}</h2>
    <ViewSwitch setSwitchState={setSwitchState} />
      </div>
      <div className='container content' style={contentStyle}>
        <h2 className='hotel-list-heading'>{hotels.length === 0 ? 'No Hotels Avalable' : "List of the Hotels Avalable"}</h2>
        <div className="row row-cols-3">
        {hotels.map((hotel) => {
          return<HotelItem key={hotel._id} hotel={hotel} switchState={switchState} />
        }) }
        </div>
    </div>
    </>
  )
}

export default AvableHotel