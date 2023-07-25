import React from 'react';
import { Link } from 'react-router-dom';

const PaymentCancel = () => {
  return (
    <div className="container">
      <div className="content">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="120"
          height="120"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="feather feather-x-circle"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="15" y1="9" x2="9" y2="15" />
          <line x1="9" y1="9" x2="15" y2="15" />
        </svg>
        <h1>Transaction Failed</h1>
        <p>Sorry, your transaction could not be completed.</p>
        <p>Please try again later or contact customer support.</p>
        <Link to="/" className="home-link">
          Go to Home
        </Link>
      </div>
    </div>
  );
};

export default PaymentCancel;
