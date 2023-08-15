import React, { useContext, useState } from "react";
import "./Search.css";
import reservationContext from "../context/reservationContext";
import { useNavigate } from "react-router-dom";

function Search() {
  const context = useContext(reservationContext);
  const { setReservation } = context;

  const date = new Date();
  const date2 = new Date().toISOString();

  const currentDate = date2;
  function addOneDay(date) {
    date.setDate(date.getDate() + 1);
    return date;
  }
  const nextDate = addOneDay(date).toISOString();

  const [searchData, setSearchData] = useState({
    radioBtn: "India",
    searchLocation: "",
    checkInDate: currentDate.split("T")[0],
    checkOutDate: nextDate.split("T")[0],
    noOfAdults: "2",
    noOfChild: "0",
    noOfRooms: "1",
  });
  const night =
    searchData.checkOutDate.split("-")[2] -
    searchData.checkInDate.split("-")[2];

  const navigate = useNavigate();
  function handleSubmit(event) {
    event.preventDefault();
    if (searchData.checkOutDate <= searchData.checkInDate) {
      alert("Please select a valid Date");
    } else {
      setReservation({
        checkInDate: searchData.checkInDate,
        checkOutDate: searchData.checkOutDate,
      });
      navigate("/avalablehotels");
    }
  }

  const onChange = (e) => {
    setSearchData({ ...searchData, [e.target.name]: e.target.value });
  };

  return (
    <form>
      <div
        className="search-form position-relative mx-auto">
        <div
          className="card rounded-4"
          style={{
            width: "100%",
            boxShadow: "rgba(0, 0, 0, 0.05) 0px 0px 0px 1px",
          }}
        >
          <div className="card-body search-body d-flex flex-column ">
            <div className="radio d-flex">
              <div className="form-check">
                <input
                  className="form-check-input formInput"
                  type="radio"
                  name="radioBtn"
                  id="flexRadioDefault1"
                  value="India"
                  checked
                  onChange={onChange}
                />
                <label className="form-check-label label-1" htmlFor="flexRadioDefault1">
                  India
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input formInput"
                  type="radio"
                  name="radioBtn"
                  id="flexRadioDefault2"
                  value="International"
                  onChange={onChange}
                />
                <label className="form-check-label label-2" htmlFor="flexRadioDefault2">
                  International
                </label>
              </div>
            </div>

            <div id="search-input" className="p-2">
              <label htmlFor="searchLocation">Where?</label>
              <input
                id="searchLocation"
                name="searchLocation"
                onChange={onChange}
                defaultValue={searchData.searchLocation}
                className="form-control me-2 form-control-plaintext formInput"
                type="search"
                placeholder="Hotel / Landmarks / Destination"
                aria-label="Search"
              />
            </div>
            <hr />
            <div
              id="checkin-out"
              className="p-2 d-flex justify-content-between align-items-center"
            >
              <div>
                <label htmlFor="check-in">Check-in</label>
                <br />
                <input
                  type="date"
                  id="check-in"
                  name="checkInDate"
                  min={currentDate.split("T")[0]}
                  onChange={onChange}
                  value={searchData.checkInDate}
                  className="form-control-plaintext p-2 formInput"
                />
              </div>
              <div className="vr position-relative">
                <span className="position-absolute top-50 start-50 translate-middle badge rounded-pill">
                  {night} Nights
                </span>
              </div>
              <div>
                <label htmlFor="check-out">Check-out</label>
                <br />
                <input
                  type="date"
                  id="check-out"
                  name="checkOutDate"
                  min={nextDate.split("T")[0]}
                  onChange={onChange}
                  value={searchData.checkOutDate}
                  className="form-control-plaintext p-2 formInput"
                />
              </div>
            </div>
            <hr />
            <div id="gusts-rooms" className="p-2">
              <h6 className="guest-heading">Gusts & Rooms</h6>
              <h5 className="guest-detail">
                Adults {searchData.noOfAdults} | Child {searchData.noOfChild} |
                Room {searchData.noOfRooms}
              </h5>
            </div>
            <hr />
          </div>
        </div>
        <button
          className="btn position-absolute top-100 start-50 translate-middle searchBtn"
          type="submit"
          onClick={handleSubmit}
        >
          SEARCH
        </button>
      </div>
    </form>
  );
}

export default Search;
