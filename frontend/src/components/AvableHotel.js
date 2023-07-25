import React, { useContext, useEffect } from 'react'
import './AvalableHotel.css'
import HotelItem from '../components/HotelItem'
import hotelContext from '../context/hotelContext';
import reservationContext from '../context/reservationContext';
import { useLocation } from 'react-router-dom';

function AvableHotel() {

  const context = useContext(hotelContext, reservationContext);
  const {hotels, getAllHotels, reservation} = context;
  useEffect(() => {
      getAllHotels(reservation);
    
    // eslint-disable-next-line
  },[])

    // Automatically scrolls to top whenever pathname changes
    const { pathname } = useLocation();

    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);

  return (
    <div className="backcolor pt-1">
    <div className='container content' style={{"marginTop": "80px"}}>
        <h2 style={{color: 'white', fontWeight: "bolder", fontFamily: "'Rubik', sans-serif"}} >{hotels.length === 0 ? 'No Hotels Avalable' : "List of the Hotels Avalable"}</h2>
        <div className="row row-cols-3">
        {hotels.map((hotel) => {
          return<HotelItem key={hotel._id} hotel={hotel} />
        }) }
        </div>
    </div>
    </div>
  )
}

export default AvableHotel