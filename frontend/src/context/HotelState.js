import HotelContext from "./hotelContext";
import { useContext, useState } from "react";
import reservationContext from "./reservationContext";

const HotelState = (props)=>{

    const context = useContext(reservationContext);
    const { reservation, guestDetails, totalAmount } = context;

const host = process.env.REACT_APP_HOST_URL;
const [hotels, setHotels] = useState([]);
const [selectedHotelDetails, setSelectedHotelDetails] = useState([]);
const [ loading, setLoading ] = useState(false)

const getAllHotels =async ()=>{
  setLoading(true)
    const response = await fetch(`${host}/api/avalablehotels`, {
        method: "POST",
        headers: {"Content-Type" : "application/json"},
        body: JSON.stringify({reservation})
    })
    const json = await response.json();
    setHotels(json)
    setLoading(false)

};

const getHotelDetail = async (id) => {
    try {
      const response = await fetch(`${host}/api/avalablehotels/hoteldetails/${id}`, {
        method: "GET",
        headers: {"Content-Type" : "application/json" },
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch hotel details');
      }
  
      const json = await response.json();
      setSelectedHotelDetails(json);
    } catch (error) {
      console.error('Error fetching hotel details:', error);
    }
  }
  

const confirmBooking = async (bookingStatus) => {

    const token = localStorage.getItem('token');
    const hotelId = selectedHotelDetails._id;
    const billingAdd = guestDetails.address;
    const { pinCode, state } = guestDetails;
    let totalAmountPaid = totalAmount;
    const paymentInfo =  { totalAmountPaid };

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
    // console.log(reservation, hotelId, bookingStatus, paymentInfo, billingAdd, pinCode, state)
}

const cancelbooking = async (hotelId, bookingId) =>{
  const token = localStorage.getItem("token");

  const response = await fetch(`${host}/api/avalablehotels/cancelbooking`,{
    method:'PUT',
    headers: {
      "Content-Type" : "application/json",
      "auth-token": token
    },
    body: JSON.stringify({ hotelId: hotelId, bookingId: bookingId })
  })
  const json = await response.json();
  console.log(response.body, json)
}

return (
    <HotelContext.Provider value={{ loading, hotels ,getAllHotels, selectedHotelDetails, getHotelDetail, confirmBooking, cancelbooking }}>
        {props.children}
    </HotelContext.Provider>
)
}
export default HotelState;
