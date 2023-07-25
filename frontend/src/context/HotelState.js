import HotelContext from "./hotelContext";
import { useContext, useState } from "react";
import reservationContext from "./reservationContext";

const HotelState = (props)=>{

    const date = new Date().toISOString()
    const context = useContext(reservationContext);
    const { reservation, guestDetails } = context;

const host = process.env.REACT_APP_HOST_URL;
const [hotels, setHotels] = useState([]);
const [selectedHotelDetails, setSelectedHotelDetails] = useState([]);

const getAllHotels =async ()=>{
    const response = await fetch(`${host}/api/avalablehotels`, {
        method: "POST",
        headers: {"Content-Type" : "application/json"},
        body: JSON.stringify({reservation})
    })
    const json = await response.json();
    setHotels(json)
    // console.log(JSON.stringify({reservation}))
};

const getHotelDetail = async (id) =>{
        const response = await fetch(`${host}/api/avalablehotels/hoteldetails/${id}`, {
            method: "GET",
            headers: {"Content-Type" : "application/json" },
        })
        const json = await response.json();
        setSelectedHotelDetails(json)
        // console.log(id)
    // console.log(hotelDetails)
}

const confirmBooking = async (bookingStatus, hotelId, totalAmount) => {

    const token = localStorage.getItem('token');
    const billingAdd = guestDetails.address;
    const { pinCode, state } = guestDetails;
    let paidAt = date;
    let totalAmountPaid = totalAmount;
    const paymentInfo =  [{ totalAmountPaid, paidAt }];

    const response = await fetch(`${host}/api/avalablehotels/booking`, {
        method:"PUT",
        headers: {
            "Content-Type" : "application/json",
            "auth-token": token
    },
        body: JSON.stringify({ reservation, hotelId, bookingStatus, paymentInfo, billingAdd, pinCode, state })
    })
    // eslint-disable-next-line
    const json = await response.json();
    console.log(hotelId)
}

return (
    <HotelContext.Provider value={{ hotels ,getAllHotels, selectedHotelDetails, getHotelDetail, confirmBooking}}>
        {props.children}
    </HotelContext.Provider>
)
}
export default HotelState;