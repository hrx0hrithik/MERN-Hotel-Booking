import "./Home.css";
import React, { useContext, useEffect } from "react";
import Search from "../components/Search";
import HotelCard from "../components/HotelCard";
import Footer from "./Footer";
import userContext from "../context/userContext";
import { useLocation } from "react-router-dom";

function Home(props) {
  const context = useContext(userContext);
  const { setUserDetails } = context;

  const host = process.env.REACT_APP_HOST_URL;
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      const fetchUserData = async () => {
        const response = await fetch(`${host}/api/auth/getuserdata`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": token,
          },
        });
        const userData = await response.json();
        setUserDetails(userData);
        localStorage.setItem("username", userData.name);
      };
      fetchUserData();
    }
    // eslint-disable-next-line
  }, []);

  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <div className="home">
        <div className="rectangle"></div>
        <div className="container home-cont">
          <h4 className="home-heading">Book hotel & Homestay</h4>
          <Search showAlert = {props.showAlert} />
          <hr className="dod-hr" />
          <h4 className="deal-of-day">Deal of the day</h4>

          <div className="card dod-card">
            <div className="card-body p-0">
              <div className="d-flex">
                <div className="card dod-icon" style={{ marginTop: '0px'}}>
                  <img
                    src="https://gos3.ibcdn.com/nond_v2_new-1635506214.png"
                    alt="Deal of the Day Logo"
                  />
                </div>
                <div>
                  <div className="card dod-item" >
                    <img
                      src="https://www.tourmyindia.com/blog//wp-content/uploads/2016/02/Top-10-Luxury-Hotels-in-India.jpg"
                      className="cardImg card-img-top p-3"
                      alt="..."
                    />
                    <div className="card-body">
                      <h5 className="card-title">Rambagh Palace,</h5>
                      <h5 className="card-title">Jaipur</h5>
                      <p className="dod-card-text">
                        Some quick example text to build on the card title and
                        make up the bulk of the card's content.
                      </p>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="card dod-item">
                    <img
                      src="https://images.livemint.com/img/2022/07/16/600x338/oberoi_hotels_1_1657935679842_1657935694775_1657935694775.webp"
                      className="cardImg card-img-top p-3"
                      alt="..."
                    />
                    <div className="card-body">
                      <h5 className="card-title">
                        The Oberoi Udaivilas,</h5>
                        <h5 className="card-title">Udaipur</h5>
                      <p className="dod-card-text">
                        Some quick example text to build on the card title and
                        make up the bulk of the card's content.
                      </p>
                    </div>
                  </div>
                </div>
                <HotelCard />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Home;
