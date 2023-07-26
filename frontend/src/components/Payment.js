import React, { useContext } from 'react'
import reservationContext from "../context/reservationContext";
import hotelContext from '../context/hotelContext';
import { useNavigate } from 'react-router-dom';


const Payment = () => {
  // const host = process.env.REACT_APP_HOST_URL;
  
  let history = useNavigate();
  const context = useContext(reservationContext);
  const context2 = useContext(hotelContext);

  const { guestDetails, totalAmount, reservation } = context;
  const { selectedHotelDetails } = context2;


  const checkOut = ()=>{

    alert("Payment Successfull");
    history('/payment/success')


  //   fetch(`${host}/create-checkout-session`, {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({
  //       hotelBookingDetails: {
  //         hotelName: selectedHotelDetails.hotelName,
  //         imageUrl: selectedHotelDetails.imageUrl,
  //         totalAmount: totalAmount, // Make sure totalAmount is provided here
  //         checkInDate: reservation.checkInDate,
  //         checkInTime: "11:00 AM",
  //         checkOutDate: reservation.checkOutDate,
  //         checkOutTime: "02:00 AM",
  //       },
  //       guestDetails: guestDetails
  //     })
  //   }).then(async res => {
  //     if (res.ok) return res.json()
  //     const json = await res.json();
  //     return await Promise.reject(json);
  //   }).then(({ url }) => {
  //     window.open(url)
  //   }).catch(e => {
  //     console.error(e.error)
  //   });
    
    localStorage.setItem('totalAmount', totalAmount);
    localStorage.setItem('guesttitle', guestDetails.title);
    localStorage.setItem('guestname', guestDetails.fullname);
    localStorage.setItem('guestphone', guestDetails.phone);
    // localStorage.setItem('ckeckInTime', checkInTime);
    // localStorage.setItem('ckeckOutTime', checkOutTime);
    localStorage.setItem('ckeckIn', reservation.checkInDate);
    localStorage.setItem('ckeckOut', reservation.checkOutDate);
    localStorage.setItem('hotelName', selectedHotelDetails.hotelName);
    localStorage.setItem('hotelId', selectedHotelDetails._id);
    // console.log(selectedHotelDetails, totalAmount, guestDetails, reservation)
 }


  return (
    <div>
      <h1 className='mt-5 pt-5 mb-2'>Confirm the Payment of <strong style={{color: "#ff6d38"}}>₹{totalAmount}</strong> </h1>
      <button className='btn btn-success mx-5' onClick={checkOut}>Pay ₹{totalAmount} with stripe</button>
      <p className='closeTab m-3'>After payment you can close this tab</p>
    </div>
  )
}

export default Payment
