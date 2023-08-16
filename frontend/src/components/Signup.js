import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Home.css";
import userContext from "../context/userContext";

function Signup(props) {
  const host = process.env.REACT_APP_HOST_URL;

  const [credentials, setCredentials] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    cpassword: "",
  });
  const context = useContext(userContext);
  const { setUserDetails } = context;

  let history = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (credentials.password !== credentials.cpassword) {
      document.getElementById("c-password").classList.add("is-invalid");
    } else {
      document.getElementById("c-password").classList.add("is-valid");
      const { name, phone, email, password } = credentials;
      const response = await fetch(`${host}/api/auth/createuser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, phone, email, password }),
      });
      const json = await response.json();
      if (json.success) {
        // Save the auth token and redirect
        localStorage.setItem("token", json.authToken);
        props.showAlert("Account Created Successfully");
        const response = await fetch(`${host}/api/auth/getuserdata`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": json.authToken,
          },
        });
        const userData = await response.json();
        setUserDetails(userData);
        history("/");
      } else {
        alert("Invalid Creditantials");
        props.showAlert("Email already exist");
      }
    }
  };
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="home" style={{ marginTop: "-15px" }}>
      <div className="container p-2 " style={{ marginTop: "75px" }}>
        <h2 className="fw-bolder heading-signup">Signup</h2>
        <div
          className="container signup-div border shadow p-4 mb-5 bg-body-tertiary rounded position-relative">
          <form className="" onSubmit={handleSubmit}>
            <Link
              type="button"
              className="btn-close position-absolute top-0 end-0 p-3"
              aria-label="Close"
              to="/"
            ></Link>
            <div className="mb-3">
              <label htmlFor="user-full-name" className="form-label">
                Full Name
              </label>
              <input
                type="text"
                onChange={onChange}
                name="name"
                className="form-control"
                id="user-full-name"
                aria-describedby="emailHelp"
                placeholder="eg. Jhon Curry"
                minLength={5}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="user-phone" className="form-label">
                Phone No.
              </label>
              <input
                type="tel"
                onChange={onChange}
                className="form-control"
                id="user-phone"
                name="phone"
                minLength={10}
                aria-describedby="emailHelp"
                placeholder="+91..."
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="user-email" className="form-label">
                Email address
              </label>
              <input
                type="email"
                onChange={onChange}
                minLength={10}
                className="form-control"
                id="user-email"
                name="email"
                aria-describedby="emailHelp"
                placeholder="email@email.com"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="create-password" className="form-label">
                Create Password
              </label>
              <input
                type="password"
                name="password"
                className="form-control"
                id="create-password"
                onChange={onChange}
                minLength={5}
                required
              />
              <span id="passwordHelpInline" className="form-text">
                Must be 6-20 characters long.
              </span>
            </div>
            <div className="mb-3">
              <label htmlFor="c-password" className="form-label">
                Confirm Password
              </label>
              <input
                type="password"
                className="form-control"
                name="cpassword"
                id="c-password"
                onChange={onChange}
                required
              />
            </div>
            <div className="mb-3 form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="tnc"
                required
              />
              <label className="" htmlFor="tnc">
                Agreed to Terms and Condition
              </label>
            </div>
            <button type="reset" className="btn btn-secondary mx-2">
              Cancel
            </button>
            <button type="submit" className="btn btn-primary mx-2">
              Submit
            </button>
          </form>
          <div className="mt-2 mb-0 text-secondary">
            Already have an account <Link to="/login">Login</Link> here
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
