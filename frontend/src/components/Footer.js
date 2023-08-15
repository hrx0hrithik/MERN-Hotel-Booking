import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css'

const Footer = () => {

  return (
    <footer className='footer' >
      <hr/>
      <div className="container">
        <div className="row">
          <div className="maidwith col-md-6 d-flex justify-content-between">
            <span>© 2023 GoYOLO</span> <span>Made with ❤️ form Hrithik</span>
          </div>
          <div className="col-md-6 text-center ">
            <ul className="tnc-container list-inline text-md-end">
              <li className="list-inline-item"><Link to="/">Privacy Policy</Link></li>
              <li className="list-inline-item">| <Link to="/">Terms of Service</Link></li>
              <li className="list-inline-item">| <Link to="/">Contact Us</Link></li>
            </ul>
          </div>
        </div>
      </div>
      <hr/>
    </footer>
  );
};

export default Footer;
