import React, { useContext, useEffect, useRef, useState } from "react";
import userContext from "../context/userContext";
import hotelContext from '../context/hotelContext';
import Footer from "./Footer";
import placeholderProfileImg from "../assets/images/profile-default.png";
import playstoreIcon from "../assets/images/playstore-icon.png";
import "./Profile.css";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";

const Profile = (props) => {

  const history = useNavigate()

  const host = process.env.REACT_APP_HOST_URL;
  const context = useContext(userContext);
  const context2 = useContext(hotelContext);
  const { userDetails, fetchUserDetails } = context;
  const { cancelbooking } = context2;

  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState([]);
  const [showModal, setShowModal] = useState(false);
  // eslint-disable-next-line
  const [modalIndex, setModalIndex] = useState(null);
  const [modalHotelId, setModalHotelId] = useState(null);
  const [modalBookingId, setModalBookingId] = useState(null);
  const imageInputRef = useRef(null);

  const openModal = (index, hotelId, _id) => {
    setShowModal(true);
    setModalIndex(index);
    setModalHotelId(hotelId);
    setModalBookingId(_id);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleCancelBooking = async() => {
    await cancelbooking(modalHotelId, modalBookingId);
    closeModal();
    props.showAlert('Booking Canceled Successfully')
    // history(0)
  };

  const handleImageUpload = async (event) => {
    const imageFile = event.target.files[0];
    setLoading(true)

    if (imageFile) {
      const formData = new FormData();
      formData.append("image", imageFile);
      const token = localStorage.getItem('token')

      try {
        const response = await fetch(`${host}/api/auth/updateprofileimg`, {
          method: "POST",
          headers: { 
            "auth-token": token,
          },
          body: formData,
        });

        if (response.ok) {
          // Image uploaded successfully
          console.log("Image uploaded successfully");
          props.showAlert('Image uploaded successfully')
          setLoading(false)
        } else {
          console.error("Image upload failed");
          setLoading(false)
        }
      } catch (error) {
        console.error("Error uploading image:", error);
        setLoading(false)
      }
    }
  };

  const fetchHotelNameForBooking = async (booking) => {
    const hotelId = booking.hotelId;
    if (hotelId) {
      try {
        const response = await fetch(
          `${host}/api/avalablehotels/hoteldetails/${hotelId}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch hotel details");
        }

        const json = await response.json();
        return { ...booking, hotelName: json.hotelName };
      } catch (error) {
        console.error("Error fetching hotel details:", error);
        return { ...booking, hotelName: "N/A" };
      }
    } else {
      return { ...booking, hotelName: "N/A" };
    }
  };

  useEffect(() => {
    fetchUserDetails().then(async () => {
      if (userDetails && userDetails.booking) {
        setLoading(false); // Move loading state update here

        const updatedBookings = await Promise.all(
          userDetails.booking.map(async (booking) => {
            const updatedBooking = await fetchHotelNameForBooking(booking);
            return updatedBooking;
          })
        );

        setRows(updatedBookings);
      } else {
        setLoading(false); // No booking details, set loading to false
      }
    });
    // eslint-disable-next-line
  }, [loading]);

  function formatDate(isoDate) {
    const date = new Date(isoDate);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString(undefined, options);
  }
  function handleBackClick() {
    history(-1)
  }

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="profileDiv">
      <section className="background">
        <div>
        <i className="bi bi-arrow-left-short" onClick={handleBackClick}></i>
        <p className="heading"> 
         My Profile</p>
         </div>
      </section>
      <section className="profile-body">
        <div className="card card-1">
          <div className="image-body">
            <div className="profile-img-wrap">
              <img
                src={userDetails.profileImg ? `data:image/jpeg;base64,${userDetails.profileImg.imgBuffer.toString('base64')}` : placeholderProfileImg}
                alt="Profile"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                className=""
              />
            </div>
            <input
            ref={imageInputRef}
              type="file"
              className="d-none"
              accept="image/*"
              name="firstimg"
              onChange={handleImageUpload}
            />
            <button className="mob-img" onClick={() => imageInputRef.current.click()}><i className="bi bi-camera-fill"></i></button>
            <button className="btn edit-img-btn btn-outline-primary mt-2" onClick={() => imageInputRef.current.click()}>
              <i className="bi bi-pencil"></i> Edit Photo
            </button>
          </div>
          <div className="card-body text-body">
            <div>
              <p className="p-0 username-heading">{userDetails.name}</p>
              <p className="text-muted">{userDetails.email}</p>
              <p className="text-muted">
                {userDetails.phone ? userDetails.phone : "N/A"}
              </p>
            </div>
          </div>
        </div>

        <div className="card card-2">
          <p className="info-heading">Personal Information</p>
          <div className="info-field-body">
            <div className="column-fields">
              <div className="floating-labels">
                <input
                  type="number"
                  name="MobileNumber"
                  defaultValue={userDetails.phone}
                />
                <label htmlFor="MobileNumber">Mobile Number</label>
              </div>
              <div className="floating-labels">
                <input
                  type="email"
                  name="EmailID"
                  defaultValue={userDetails.email}
                />
                <label htmlFor="EmailID">Email ID</label>
              </div>
            </div>
            <div className="column-fields">
              <div className="floating-labels">
                <input
                  type="text"
                  name="FullName"
                  defaultValue={userDetails.name}
                />
                <label htmlFor="FullName">Full Name</label>
              </div>
              <div className="floating-labels">
                <input type="date" name="DOB" placeholder="" />
                <label htmlFor="DOB">Date of Birth</label>
              </div>
            </div>
            <div className="column-fields mt-5 justify-content-start">
              <button className="prof-btn save-btn">Save</button>
              <button className="prof-btn">Cancel</button>
            </div>
          </div>
        </div>
        <div className="card card-2">
          <p className="info-heading">Billing Information</p>
          <div className="info-field-body">
            <div className="column-fields">
              <div className="floating-labels">
                <input
                  type="text"
                  name="BillingAdd"
                  defaultValue={userDetails.address ? userDetails.address : ""}
                  placeholder=""
                />
                <label htmlFor="BillingAdd">Billing Address</label>
              </div>
              <div className="floating-labels">
                <input
                  type="number"
                  name="Pincode"
                  defaultValue={userDetails.pinCode ? userDetails.pinCode : ""}
                  placeholder=""
                />
                <label htmlFor="Pincode">Pincode</label>
              </div>
            </div>
            <div className="column-fields">
              <div className="floating-labels">
                <input
                  type="text"
                  name="State"
                  defaultValue={userDetails.state ? userDetails.state : ""}
                  placeholder=""
                />
                <label htmlFor="State">State</label>
              </div>
            </div>
            <div className="column-fields mt-5 justify-content-start">
              <button className="prof-btn save-btn">Save</button>
              <button className="prof-btn">Cancel</button>
            </div>
          </div>
        </div>

        <div className="booking-div card card-2" style={{ minHeight: "200px" }}>
          <p className="info-heading">Booking Details</p>
          <div className="info-field-body">
            <div className="active-booking">
              <h6>History</h6>
              <div className="table-wrap">
                <table className="table table-bordered custom-rounded">
                  <thead>
                    <tr className="table-primary">
                      <th scope="col">Date</th>
                      <th scope="col">Hotel Name</th>
                      <th scope="col">Check-In</th>
                      <th scope="col">Check-Out</th>
                      <th scope="col">Total</th>
                      <th scope="col">Booking Status</th>
                      <th scope="col" className="d-none">Booking ID</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((row, index) => (
                      <tr key={index}>
                        <td>
                          {row.paymentInfo?.paidAt
                            ? formatDate(row.paymentInfo.paidAt)
                            : ""}
                        </td>
                        <td>{row.hotelName ? row.hotelName : ""}</td>
                        <td>
                          {row.reservation?.checkInDate
                            ? row.reservation.checkInDate
                            : ""}
                        </td>
                        <td>
                          {row.reservation?.checkOutDate
                            ? row.reservation.checkOutDate
                            : ""}
                        </td>
                        <td>
                          {row.paymentInfo?.totalPaid
                            ? row.paymentInfo.totalPaid
                            : ""}
                        </td>
                        <td>
                          {row.bookingStatus === "Success" && (
                            <p className="text-success">{row.bookingStatus}</p>
                          )}
                          {row.bookingStatus === "Failed" ||
                            (row.bookingStatus === "Canceled" && (
                              <p className="text-danger">{row.bookingStatus}</p>
                            ))}
                          {row.bookingStatus === "Expired" && (
                            <p className="text-secondary">
                              {row.bookingStatus}
                            </p>
                          )}
                          {row.bookingStatus === "Success" && (
                            <div>
                              <button
                                className="cancel-book-btn"
                                onClick={() => { openModal(index, row.hotelId, row._id); }}
                              >
                                Cancel Booking
                              </button>
                            </div>
                          )}
                        </td>
                        <td className="d-none">{row._id}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        {showModal && (
          <div
            className="modal"
            tabIndex="-1"
            style={{ display: showModal ? "block" : "none" }}
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Confirm Cancellation</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={closeModal}
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <p>Are you sure you want to cancel this booking?</p>
                </div>
                <div className="modal-footer" style={{ borderTop: "none" }}>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={closeModal}
                  >
                    Close
                  </button>
                  <button type="button" className="btn btn-danger" onClick={handleCancelBooking}>
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="card ">
          <div className="app-banner">
            <div className="banner-img1"></div>
            <div className="banner-text">
              <h3 className="fw-bolder fs-4">Exclusive offers on the app!</h3>
              <p className="text-muted">
                Download the Goibibo app and save more
              </p>
              <img src={playstoreIcon} alt="..." className="playstore-icon" />
            </div>
            <span className="qrcode-span">
              <div className="qrcode-wrap">
                <div className="scantoget">Scan to download</div>
                <div className="qrcode"></div>
              </div>
            </span>
          </div>
        </div>
        <div className="logoutBtn-div">
        <button className="logout-btn">
        <i className="bi bi-box-arrow-right"></i><span className="logout-name">LOGOUT</span>
        </button>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Profile;