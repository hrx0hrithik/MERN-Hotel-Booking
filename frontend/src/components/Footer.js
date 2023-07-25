import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {

  return (
    <div className='footer' >
      <hr/>
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <p>© 2023 GoYOLO. All rights reserved.</p>
          </div>
          <div className="col-md-6">
            <ul className="list-inline text-md-end">
              <li className="list-inline-item"><Link to="/">Privacy Policy</Link></li>
              <li className="list-inline-item"><Link to="/">Terms of Service</Link></li>
              <li className="list-inline-item"><Link to="/">Contact Us</Link></li>
            </ul>
          </div>
        </div>
      </div>
      <hr/>
    </div>
  );
};

export default Footer;
