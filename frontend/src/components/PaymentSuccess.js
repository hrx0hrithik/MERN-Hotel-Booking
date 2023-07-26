import React, { useContext, useEffect, useState } from 'react';
import hotelContext from '../context/hotelContext';
import { Link, useNavigate } from 'react-router-dom';

const PaymentSuccess = () => {
  const context = useContext(hotelContext);
  const { confirmBooking } = context;
  const [receiptFilePath, setReceiptFilePath] = useState('');
  let date = new Date().toISOString();
  const host = process.env.REACT_APP_HOST_URL;

  const totalAmount = localStorage.getItem('totalAmount');
  const guesttitle = localStorage.getItem('guesttitle');
  const guestname = localStorage.getItem('guestname');
  const guestphone = localStorage.getItem('guestphone');
  const ckeckIn = localStorage.getItem('ckeckIn');
  const ckeckOut = localStorage.getItem('ckeckOut');
  const hotelName = localStorage.getItem('hotelName');
  const hotelId = localStorage.getItem('hotelId');

  let history = useNavigate();
  let bookingStatus = 'Success';
  confirmBooking(bookingStatus, hotelId, totalAmount);

  const formData = {
    title: guesttitle,
    name: guestname,
    phone: guestphone,
    amount: totalAmount,
    date: date,
    checkInDate: ckeckIn,
    chechInTime: "11:00 AM",
    chechOutDate: ckeckOut,
    chechOutTime: "02:00 AM",
    paidTo: hotelName,
    logo: null,
  };

  const handleDownload = async () => {
    try {
      // Send the form data to the backend to generate the receipt
      const response = await fetch(`${host}/generate-receipt`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      // Get the response as a Blob containing the PDF data
      const pdfBlob = await response.blob();

      // Create a Blob URL to initiate the download
      const blobUrl = URL.createObjectURL(pdfBlob);

      // Set the Blob URL to state so that we can use it later for the download
      setReceiptFilePath(blobUrl);
    } catch (error) {
      console.error('Error generating receipt:', error);
    }
  };

  useEffect(() => {
    // Call handleDownload once the component is mounted to generate the receipt
    handleDownload();
    // eslint-disable-next-line
  }, []);

  const handleDownloadReceipt = () => {
    if (receiptFilePath) {
      // Create a link and initiate the download
      const link = document.createElement('a');
      link.href = receiptFilePath;
      link.download = `generated-receipt-${formData.name}-${Date.now()}.pdf`;
      link.click();
    }
  };

  useEffect(() => {
    if (receiptFilePath) {
    handleDownloadReceipt();
    setTimeout(() => {
     history('/') ;
    }, 8000);
    } // eslint-disable-next-line
  }, [receiptFilePath]);

  return (
    <div className='container m-4'>
      <h2 className='m-5, p-5'>Payment Successful !!! DO NOT REFRESH</h2>
      <div className="container">
      <h2>Booking Successful</h2>
      <p> If not automaticlly downloaded click
        {' '} 
        <button type='button' className='btn btn-primary' onClick={handleDownloadReceipt}>
          Download Receipt
        </button>{' '}
      </p>
      <p>
        If not Redirected Click to go-Back to <Link to='/'>Home Page</Link>
      </p>
      </div>
    </div>
  );
};

export default PaymentSuccess;
