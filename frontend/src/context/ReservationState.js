import ReservationContext from './reservationContext'
import React, { useState } from 'react'

const ReservationState = (props) => {

    const date = new Date()
    const currentDate = new Date().toISOString()
    function addOneDay(date) {
        date.setDate(date.getDate() + 1);
        return date;
      }
      const nextDate = addOneDay(date).toISOString();

      const initialGuest = {
        title: "",
        fullname: "",
        billEmail: "",
        phone: "",
        age: "",
        address: "",
        pinCode: "",
        state: ""
      }

    const [reservation, setReservation] = useState({checkInDate: currentDate.split('T')[0] , checkOutDate: nextDate.split('T')[0]})
    const [guestDetails, setGuestDetails] = useState(initialGuest)
    const [totalAmount, setTotalAmount] = useState(0)

    const nights = (reservation.checkOutDate.split('-')[2] - reservation.checkInDate.split('-')[2])

  return (
    <ReservationContext.Provider value={{reservation, setReservation, nights, guestDetails, setGuestDetails, totalAmount, setTotalAmount}} >
        {props.children}
    </ReservationContext.Provider>
  )
}

export default ReservationState
