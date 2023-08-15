import React, { useContext } from "react";
import hotelContext from "../context/hotelContext";
import { Link } from "react-router-dom";
import StarRating from "./StarRating";
import "./HotelItem.css";

function HotelItem(props) {
  const context = useContext(hotelContext);
  const { getHotelDetail } = context;
  const { hotel } = props;

  const newPrice = hotel.maxPriceRoomPerNight - hotel.discountPrice;

  let Wrapstyles = {
    container: {
      flexDirection: "column",
    },
  };
  let cardImgStyle = {
    height: "34vh",
  };
  let priceFlexStyle;
  let cardbodyStyle;

  if (!props.switchState) {
    Wrapstyles = {
      container: {
        flexDirection: "row",
        padding: "0",
        margin: "0",
      },
    };
    cardImgStyle = { 
      height: "27vh",
      width: "20vh",
      borderRadius: "12px",
      maxHeight: '240px'
     }
      priceFlexStyle = {
        position: "static",
      }
      cardbodyStyle = {
        paddingTop: "20px",
      };
  }

  return (
    <div className="col">
      <Link
        style={Wrapstyles.container}
        to={`/avalablehotels/hoteldetails/${hotel._id}`}
        onClick={async () => {
          await getHotelDetail(hotel._id);
        }}
        className="card hotel-card"
      >
        <img
          id="cardImg"
          src={hotel.imageUrl}
          className="cardImg card-img-top"
          alt="..."
          style={cardImgStyle}
        />
        <div className="card-body hotelitem-cardbody" style={cardbodyStyle}>
          <h5 className="card-title">{hotel.hotelName}</h5>
          <p className="location-text d-flex">
            <i className="bi bi-geo-alt"></i>
            {hotel.location}
          </p>
          <StarRating rating={hotel.rating} />
          <p
            className="d-flex flex-column text-end price-flex"
            style={priceFlexStyle}
          >
            {" "}
            <span className="cutPrice"> ₹{hotel.maxPriceRoomPerNight}</span>
            <span className="newPrice"> ₹{newPrice}</span>{" "}
          </p>
          <div className="d-flex justify-content-between align-items-center">
            <span>
              <p className="badge rounded-pill text-bg-success mb-1">
                {hotel.rating}/5
              </p>
            </span>
            <span style={{ fontSize: "12px" }}>
              <b>1 room</b> per night
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default HotelItem;
