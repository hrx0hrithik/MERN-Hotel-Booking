import React, { useContext } from "react";
import hotelContext from "../context/hotelContext";
import { Link } from "react-router-dom";
import StarRating from "./StarRating";

function HotelItem(props) {

  const context = useContext(hotelContext)
  const { getHotelDetail } = context;
  const {hotel} = props

  const newPrice = (hotel.maxPriceRoomPerNight - hotel.discountPrice);

  return (
    <div className="col">
      <Link to={`/avalablehotels/hoteldetails/${hotel._id}`} onClick={async ()=>{await getHotelDetail(hotel._id)}} className="card hotel-card my-3" >
        <img src={hotel.imageUrl} className="cardImg card-img-top p-3" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{hotel.hotelName}</h5>
          <p className="location-text d-flex"><i className="bi bi-geo-alt"></i>
           {hotel.location} 
          </p>
          <StarRating rating={hotel.rating}/>
          <p className="d-flex flex-column text-end"> <span className="cutPrice"> ₹{hotel.maxPriceRoomPerNight}</span>
           <span className="newPrice"> ₹{newPrice}</span>  </p>
           <div className="d-flex justify-content-between align-items-center">
           <span ><p className="badge rounded-pill text-bg-success">{hotel.rating}/5</p></span>
           <span style={{fontSize: "12px"}}><b>1 room</b> per night</span>
           </div>
        </div>
      </Link>
    </div>
  );
}

export default HotelItem;
