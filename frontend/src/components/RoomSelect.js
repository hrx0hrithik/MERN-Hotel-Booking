import React, { useContext, useEffect } from "react";
import "./HotelItem.css";
import './AvalableHotel.css'
import hotelContext from "../context/hotelContext";
import { useLocation, useNavigate } from "react-router-dom";
import reservationContext from "../context/reservationContext";
import StarRating from "./StarRating";

function RoomSelect() {
  const history = useNavigate();
  const context = useContext(hotelContext);
  const context2 = useContext(reservationContext);
  const { selectedHotelDetails } = context;
  const { nights, reservation, setGuestDetails, guestDetails, setTotalAmount } = context2;
 
  let noOfGuest = 1;
  const addGuestDiv = ()=>{

    if(noOfGuest >=2){
      alert(`Only ${noOfGuest} is Maximum Room Capacity`);
    }
    else{
      const guestInfo2 = document.getElementById('guestInfo2');
      guestInfo2.innerHTML  = '<div className="guesttitle pe-3 ">'+
      '<span className="guestlable" >Title</span>'+
      '<select name="title" id="guest2title">'+
      '<option value="Mr">Mr</option>'+
      '<option value="Mrs">Mrs</option>'+
      '<option value="Miss">Miss</option>'+
      '</select>'+
      '</div>'+
      '<div className="guestname pe-3">'+
      '<span className="guestlable" >Full Name</span>'+
      '<input type="text" name="name" placeholder="Full Name"/>'+
      '</div>'+
      '<div className="guestage pe-3">'+
      '<span className="guestlable" >Age</span>'+
      '<input type="text" name="age" placeholder="Age"/>'+
      '</div>';
      noOfGuest += 1;
    }
}

  const newPrice = (selectedHotelDetails.maxPriceRoomPerNight - selectedHotelDetails.discountPrice)* nights;
  const totalPay = (newPrice+500);
  const token = localStorage.getItem("token")

  const handleSubmit = ()=>{
    setTotalAmount(totalPay)
    if(!token){
      alert("Please Login for Booking")
      history('/login')
    }
    else{
      history('/payment')
    }
  }

  function handleClick() {
    history(-1)
  }

  const onChange = (e)=>{
    setGuestDetails({...guestDetails, [e.target.name]: e.target.value})
  }

  // console.log(guestDetails)
    const { pathname } = useLocation();
  
    useEffect(() => {
      window.scrollTo(0, -1);
    }, [pathname]);
 
  return (
    <>
        <div className="backcolor pt-1">
    <i className="bi bi-arrow-left-short" onClick={handleClick}></i>
    <h2 className='hotel-mob-heading'>Review Booking</h2>
      </div>
      <div className="container content mb-0">
        <div className="hotel-detail-page d-flex justify-content-between my-3">
          
          <form className="left-panel d-flex flex-column" onSubmit={handleSubmit}>
            <div className=" hotel-detial-top container">
              <h4 className="hotel-info-top">HOTEL INFO</h4>
              <hr className="hotel-info-top" />
              <div className="top-wrap">
              <div className="mob-img-div">
                <img src={selectedHotelDetails.imageUrl} alt="hotel" className="mob-img" />
              </div>
                <div>
              <div id="stars">
              <StarRating rating = {selectedHotelDetails.rating}/>
              </div>
              <h5>{selectedHotelDetails.hotelName}</h5>
              <p className="text-body-secondary fs-6 m-0">
              <i className="bi bi-geo-alt"></i> {selectedHotelDetails.location}
              </p>
              <span className="badge rounded-pill text-bg-success">{selectedHotelDetails.rating}/5</span>
              </div>
              </div>
              <hr className="mob-hr" />
              <div id="carouselExampleIndicators" className="carousel slide m-2 p-2">
                <div className="carousel-indicators ">
                  <button
                    type="button"
                    data-bs-target="#carouselExampleIndicators"
                    data-bs-slide-to="0"
                    className="active"
                    aria-current="true"
                    aria-label="Slide 1"
                  ></button>
                  <button
                    type="button"
                    data-bs-target="#carouselExampleIndicators"
                    data-bs-slide-to="1"
                    aria-label="Slide 2"
                  ></button>
                  <button
                    type="button"
                    data-bs-target="#carouselExampleIndicators"
                    data-bs-slide-to="2"
                    aria-label="Slide 3"
                  ></button>
                </div>
                <div className="carousel-inner rounded">
                  <div className="carousel-item active">
                    <img
                      src={selectedHotelDetails.imageUrl}
                      className="d-block w-100 carouselImg"
                      alt="..."
                    />
                  </div>
                  <div className="carousel-item">
                    <img
                      src={selectedHotelDetails.image2}
                      className="d-block w-100 carouselImg"
                      alt="..."
                    />
                  </div>
                  <div className="carousel-item">
                    <img
                      src={selectedHotelDetails.image3}
                      className="d-block w-100 carouselImg"
                      alt="..."
                    />
                  </div>
                </div>
                <button
                  className="carousel-control-prev"
                  type="button"
                  data-bs-target="#carouselExampleIndicators"
                  data-bs-slide="prev"
                >
                  <span
                    className="carousel-control-prev-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="visually-hidden">Previous</span>
                </button>
                <button
                  className="carousel-control-next"
                  type="button"
                  data-bs-target="#carouselExampleIndicators"
                  data-bs-slide="next"
                >
                  <span
                    className="carousel-control-next-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="visually-hidden">Next</span>
                </button>
              </div>
              
            <div className="reservationdetails container d-flex">
              <div className="checkInWrap">
                <span className="smallText">Check In</span>
                <p> {reservation.checkInDate} </p>
                <span className="smallText">11:00 AM</span>
              </div>
              <div className="checkInWrap">
              <span className="smallText">Check Out</span>
                <p> {reservation.checkOutDate} </p>
                <span className="smallText">02:00 PM</span>
              </div>
              <div className="checkGuestWrap flex-column me-4">
              <span className="smallText">Guests</span>
                <p>2 Guets | 1 Room</p>
                <span className="smallText">{nights} Nights</span>
              </div>
            </div>
              <hr className="mob-hr" />
            </div>

            <div className=" hotel-detial-top container my-3">
              <h6 className="hotel-info-top">GUEST DETAILS</h6>
              <h6 className="mob-img-div">1 Room for 2 Adults</h6>
              <hr/>

              <div className="guestinfo py-2">
              <div className="guesttitle pe-3">
                <span className="guestlable" >Title</span>
                <select name="title" id="guest1title" required onChange={onChange}>
                  <option>..</option>
                  <option value="Mr">Mr</option>
                  <option value="Mrs">Mrs</option>
                  <option value="Miss">Miss</option>
                </select>
              </div>
              <div className="guestname pe-3">
                <span className="guestlable" >Full Name</span>
                <input type="text" name="fullname" placeholder="Full Name" onChange={onChange} required/>
              </div>
              <div className="guestage pe-2">
                <span className="guestlable" >Age</span>
                <input type="text" name="age" placeholder="Age" required onChange={onChange}/>
              </div>
              </div>
              <div  id="guestInfo2" className="guestinfo py-2"></div>
              <span className="addguest" onClick={addGuestDiv}>Add Guest</span>
              <hr/>
              <div>
                <div> <p className="guestlable">Email Address <span  className="smallText">(Your booking voucher will be sent to this email address)</span></p>  </div>
                <input type="email" name="billEmail" placeholder="Enter Email Address" required onChange={onChange}/>
              </div>
                <div> <p className="guestlable">Phone Number</p>  </div>
                +91 <input type="tel" name="phone" placeholder="Enter Phone Number" required onChange={onChange}/>
            </div>
            <div className="pinAndState  hotel-detial-top container py-4 px-3 mb-3 ">
              <h6 className="mb-0"> YOUR PINCODE AND STATE </h6>
              <p className="smallText">(Required for GST purpose on your tax invoice. You can edit this anytime later in your profile section. )</p>
              <div className="d-flex my-3 pinandstate-input">
              <div className="form-floating me-3">
               <input type="text" className="form-control" placeholder="Enter Billing Address" name="address"  required onChange={onChange}/>
              <label htmlFor="floatingInput">Billing Address</label>
                </div>
                <div className="form-floating me-3">
               <input type="text" className="form-control" placeholder="Enter Pincode" name="pinCode"  required onChange={onChange}/>
              <label htmlFor="floatingInput">Pincode</label>
                </div>
                <div className="form-floating">
              <select className="form-select" id="floatingSelect" aria-label="Floating label select example" name="state" required onChange={onChange}>
                 <option value="">Select from the following</option>
                 <option value="Andhra Pradesh">Andhra Pradesh</option>
                  <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
                  <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                  <option value="Assam">Assam</option>
                  <option value="Bihar">Bihar</option>
                  <option value="Chandigarh">Chandigarh</option>
                  <option value="Chhattisgarh">Chhattisgarh</option>
                  <option value="Dadar and Nagar Haveli">Dadar and Nagar Haveli</option>
                  <option value="Daman and Diu">Daman and Diu</option>
                  <option value="Delhi">Delhi</option>
                  <option value="Lakshadweep">Lakshadweep</option>
                  <option value="Puducherry">Puducherry</option>
                  <option value="Goa">Goa</option>
                  <option value="Gujarat">Gujarat</option>
                  <option value="Haryana">Haryana</option>
                  <option value="Himachal Pradesh">Himachal Pradesh</option>
                  <option value="Jammu and Kashmir">Jammu and Kashmir</option>
                  <option value="Jharkhand">Jharkhand</option>
                  <option value="Karnataka">Karnataka</option>
                  <option value="Kerala">Kerala</option>
                  <option value="Madhya Pradesh">Madhya Pradesh</option>
                  <option value="Maharashtra">Maharashtra</option>
                  <option value="Manipur">Manipur</option>
                  <option value="Meghalaya">Meghalaya</option>
                  <option value="Mizoram">Mizoram</option>
                  <option value="Nagaland">Nagaland</option>
                  <option value="Odisha">Odisha</option>
                  <option value="Punjab">Punjab</option>
                  <option value="Rajasthan">Rajasthan</option>
                  <option value="Sikkim">Sikkim</option>
                  <option value="Tamil Nadu">Tamil Nadu</option>
                  <option value="Telangana">Telangana</option>
                  <option value="Tripura">Tripura</option>
                  <option value="Uttar Pradesh">Uttar Pradesh</option>
                  <option value="Uttarakhand">Uttarakhand</option>
                  <option value="West Bengal">West Bengal</option>
                </select>
               <label className="" htmlFor="floatingSelect">State</label>
            </div>
                </div>
            </div>
            <button className="rounded-3 paymentBtn p-3 mt-2" type="submit" >Proceed To Payment Options</button>
            </form>
          <div className="right-panel container">
            <div className="price-panel container p-3 ">
              <h3 className="priceSummary">Price Summary</h3>
              <hr />
              <div className="row-one d-flex justify-content-between container p-2">
              <p>Room Charges (1 room x {nights} night)</p>
              <span>₹{selectedHotelDetails.maxPriceRoomPerNight * nights}</span>
              </div>
              <div className="row-one d-flex justify-content-between container p-2">
              <p>Total Discount</p>
              <span className="text-success">-₹{selectedHotelDetails.discountPrice * nights}</span>
              </div>
              <hr/>
              <div className="row-one d-flex justify-content-between container p-2">
              <p>Price after discount</p>
              <span>₹{newPrice}</span>
              </div>
              <div className="row-one d-flex justify-content-between container p-2">
              <p>Taxes & Fees</p>
              <span>₹500</span>
              </div>
              <hr/>
              <div className="payable d-flex justify-content-between container p-2">
                <h5>Payable Now</h5>
                <h5>₹{totalPay}</h5>
              </div>
            </div>
          </div>
        </div>
      </div>

      <nav className="mobile-nav navbar bg-light navbar-light">
      <div className="nav-left">
        <span className="fw-bold fs-6">₹{selectedHotelDetails.discountPrice * nights} </span><span className="text-decoration-line-through"> ₹{selectedHotelDetails.maxPriceRoomPerNight * nights} </span><span> <i className="bi bi-caret-up-fill text-primary fw-bold"></i> </span>
        <p>for 1 Room/{nights} Night</p>
      </div>
      <div className="nav-right">
        <button className="mob-paymentBtn btn"> <p  style={{ fontFamily: 'Rubik', fontSize: '14px' }}>PROCEED</p>to payment</button>
      </div>
    </nav>
      </>
  );
}

export default RoomSelect;
