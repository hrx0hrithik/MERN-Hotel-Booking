import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import AvableHotel from "./components/AvableHotel";
import Signup from "./components/Signup";
import Login from "./components/Login";
import HotelState from "./context/HotelState";
import RoomSelect from "./components/RoomSelect";
import ReservationState from "./context/ReservationState";
import Payment from "./components/Payment";
import UserState from "./context/UserState";
import Alerts from "./components/Alerts";
import { useState } from "react";
import Profile from "./components/Profile";

function App() {
  const [alert, setAlert] = useState({ msg: "", show: false });
  const showAlert = (message) => {
    setAlert({
      msg: message,
      show: true,
    });
    setTimeout(() => {
      setAlert({ msg: "", show: false });
    }, 2500);
  };

  return (
    <div>
      <UserState>
        <ReservationState>
          <HotelState>
            <Router>
              <Navbar showAlert={showAlert} />
              <Alerts alert={alert} />
              <Routes>
                <Route exact path="/" element={<Home showAlert={showAlert} />}></Route>
                <Route exact path="/about" element={<About />}></Route>
                <Route exact path="/userprofile" element={<Profile showAlert={showAlert} />}></Route>
                <Route
                  exact
                  path="/signup"
                  element={<Signup showAlert={showAlert} />}
                ></Route>
                <Route
                  exact
                  path="/login"
                  element={<Login showAlert={showAlert} />}
                ></Route>
                <Route
                  exact
                  path="/avalablehotels"
                  element={<AvableHotel />}
                ></Route>
                <Route
                  exact
                  path="/avalablehotels/hoteldetails/:id"
                  element={<RoomSelect showAlert={showAlert} />}
                ></Route>
                <Route exact path="/payment" element={<Payment />}></Route>
              </Routes>
            </Router>
          </HotelState>
        </ReservationState>
      </UserState>
    </div>
  );
}

export default App;
