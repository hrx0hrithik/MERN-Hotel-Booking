import React, { useContext, useEffect, useState } from 'react';
import reservationContext from "../context/reservationContext";
import hotelContext from '../context/hotelContext';
import { useNavigate } from 'react-router-dom';

const Payment = () => {
  const host = process.env.REACT_APP_HOST_URL;
  
  const context = useContext(reservationContext);
  const context2 = useContext(hotelContext);
  let history = useNavigate();

  const { guestDetails, totalAmount, reservation } = context;
  const { selectedHotelDetails, confirmBooking } = context2;

  const [paymentStatus, setPaymentStatus] = useState(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handlePayment = async () => {
    const paymentData = {
      amount: totalAmount * 100,
      currency: 'INR',
      receipt: 'order_rcptid_123',
      notes: {
        customer_name: guestDetails.title + '. ' + guestDetails.fullname,
        phone: guestDetails.phone,
        checkInDate: reservation.checkInDate,
        checkInTime: '11:00 AM',
        checkOutDate: reservation.checkOutDate,
        checkOutTime: '02:00 AM',
        paidTo: selectedHotelDetails.hotelName,
      },
    };
  
    try {
      const response = await fetch(`${host}/api/payment/createPayment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentData),
      });
  
      const responseData = await response.json();
  
      if (!response.ok) {
        throw new Error('Failed to create Razorpay order');
      }
  
      const order = responseData.order;
  
      const options = {
        key: 'rzp_test_MmH7RMh9ds3u1o',
        amount: order.amount,
        currency: 'INR',
        name: 'Hotel Booking',
        description: 'Payment for Hotel Booking',
        order_id: order.id,
        handler: function (response) {
          fetch(`${host}/api/payment/paymentCallback`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(response),
          })
            .then((res) => res.json())
            .then((data) => {
              // console.log('Payment verification:', data);
              setPaymentStatus('success');
              confirmBooking('Success')
            })
            .catch((error) => {
              console.error('Error verifying payment:', error);
            });
        },
        prefill: {
          name: guestDetails.fullname,
          email: guestDetails.billEmail,
          contact: guestDetails.phone,
        },
      };
  
      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
  
    } catch (error) {
      console.error('Error creating Razorpay order:', error);
    }
  };

  const handleGenerateReceipt = async () => {
    try {
      const receiptData = {
        title: guestDetails.title,
        name: guestDetails.fullname,
        phone: guestDetails.phone,
        amount: totalAmount,
        date: new Date().toLocaleString(),
        checkInDate: reservation.checkInDate,
        checkInTime: "11:00 AM",
        checkOutDate: reservation.checkOutDate,
        checkOutTime: "2:00 PM",
        paidTo: selectedHotelDetails.hotelName,
      };

      const response = await fetch(`${host}/api/payment/generateReceipt`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(receiptData),
      });

      if (!response.ok) {
        throw new Error('Failed to generate receipt');
      }

      const receiptBlob = await response.blob();
      const receiptURL = URL.createObjectURL(receiptBlob);
      // Automatically trigger the receipt download
    const downloadLink = document.createElement('a');
    downloadLink.href = receiptURL;
    downloadLink.download = `receipt_${guestDetails.fullname}_${Date.now()}.pdf`;
    document.body.appendChild(downloadLink);
    downloadLink.click();

      setTimeout(()=>{
        history('/')
      },3000)

    } catch (error) {
      console.error('Error generating receipt:', error);
    }
  };

  return (
    <div className='container'>
      <h1 className='mt-5 pt-5 mb-2'>Confirm the Payment of <strong style={{color: "#ff6d38"}}>₹{totalAmount}</strong> </h1>
      <button className='btn btn-success ms-5 me-2' onClick={handlePayment}>Pay ₹{totalAmount}</button>with Razorpay
      {paymentStatus === 'success' && ( 
        <>
        <h2 className='text-success'>Payment Successfull !!!</h2>
        <p>If Receipt does not download automaticlly click
        <button className='btn btn-primary mx-5 mt-3' onClick={handleGenerateReceipt}>
          Generate Receipt
        </button>
        </p>
        </>
      )}
      <p className='closeTab m-3'>After payment, you will redirected to Home page</p>
      <p className='text-danger'>This is a Test Payment Mode</p>
      <p><span className='fw-bold' >Use Cards </span>(with any random CVV and Any future Expiry Date)</p>
      <ul>
        <li>For Visa use : 4111 1111 1111 1111</li>
        <li>For Mastercard use : 5267 3181 8797 5449</li>
      </ul>
      <p className='fw-bold'>Use UPI </p>
      <ul>
        <li>success@razorpay</li>
        <li className='text-danger'>failure@razorpay</li>
      </ul>
    </div>
  );
};

export default Payment;
