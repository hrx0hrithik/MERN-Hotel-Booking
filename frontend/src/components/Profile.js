import React, { useContext, useEffect, useState } from 'react'
import userContext from '../context/userContext'

const Profile = () => {
  const host = process.env.REACT_APP_HOST_URL;

  const context = useContext(userContext);
  const { userDetails }= context;

  const placeholderImageURL = 'https://via.placeholder.com/150';

  const hotelId = userDetails && userDetails.booking ? userDetails.booking.hotelId : '';
  const [hotelName, setHotelName] = useState('');

  useEffect(() => {
    const fetchHotelName = async () => {
      try {
        const response = await fetch(`${host}/api/avalablehotels/hoteldetails/${hotelId}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });

        const json = await response.json();
        setHotelName(json.hotelName); // Update the hotelName state with the fetched value
      } catch (error) {
        console.error('Error fetching hotel details:', error);
        // Handle the error gracefully, e.g., set a default value for hotelName
        setHotelName('');
      }
    };

    fetchHotelName();
    // eslint-disable-next-line
  }, []);
  
  return (
    <div className='pt-5'>
    <div style={{ backgroundColor: "#f8f9fa" }} className="container mt-5 py-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div style={{ boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)" }} className="card p-4">
            <div className="card-body">
              <div className="d-flex align-items-start">
                <img src={placeholderImageURL} alt="Profile" style={{ width: "150px", height: "150px", objectFit: "cover" }} className="rounded-circle me-3" />
                <div>
                  <h2 className="mb-3">{userDetails.name}</h2>
                  <p className="text-muted mb-2">{userDetails.email}</p>
                  <p className="text-muted mb-2">{userDetails.phone ? userDetails.phone : 'N/A'}</p>
                  <hr />
                  <div className="text-start">
                  <p className="fw-bold mb-0 mt-3">Booking Details</p>
                  <p className="mb-1">Hotel Name: {hotelName ? hotelName : 'Not Avalable'}</p>
                  <p className="mb-1">Address: {userDetails.address ? userDetails.address : 'Not Avalable'}</p>
                  <p className="mb-1">Check-In Date: {userDetails.booking?.reservation?.checkInDate || 'Not Avalable'}</p>
                  <p className="mb-1">Check-Out Date: {userDetails.booking?.reservation?.checkOutDate || 'Not Avalable'}</p>
                  <p className="mb-1">Booking Status: {userDetails.booking?.bookingStatus || 'Not Avalable'}</p>
                  <p className="mb-1">Total Paid: {userDetails.booking?.paymentInfo?.totalPaid || 'Not Avalable'}</p>
                </div>
                  </div>
                </div>
              </div>
            <div className="card-footer d-flex justify-content-end">
              <button className="btn btn-primary me-2"><i className="bi bi-pencil"></i> Edit Photo</button>
              <button className="btn btn-primary"><i className="bi bi-key"></i> Change Password</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Profile
