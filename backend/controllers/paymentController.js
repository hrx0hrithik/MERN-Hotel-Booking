const Razorpay = require('razorpay');
const puppeteer = require('puppeteer');
const fs = require('fs');
const crypto = require('crypto');

const instance = new Razorpay({
  key_id: 'rzp_test_MmH7RMh9ds3u1o',
  key_secret: 'qnoXMBRD8iD0DyXcSzDfPlkH',
});

const createPaymentOrder = async (req, res) => {
  const { amount, receipt } = req.body;

  const options = {
    amount: amount, // Amount in paise
    currency: 'INR',
    receipt: receipt,
  };

  try {
    const order = await instance.orders.create(options);
    res.status(200).json({
      success: true,
      order: order,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: 'Something went wrong while creating the order.',
    });
  }
};

const handlePaymentCallback = async (req, res) => {
        const { razorpay_payment_id, razorpay_order_id, razorpay_signature, amount } = req.body;
      
        // Calculate the signature using the given formula
        const text = `${razorpay_order_id}|${razorpay_payment_id}`;
        const secret = 'qnoXMBRD8iD0DyXcSzDfPlkH'; // Replace this with your actual Razorpay key secret
      
        const generated_signature = crypto
          .createHmac('sha256', secret)
          .update(text)
          .digest('hex');
      
        if (generated_signature === razorpay_signature) {
          // Proceed with updating your database
          // and send the response indicating payment success
          res.json({ transactionStatus: 'success', totalAmountPaid: amount });
        } else {
          res.status(400).json({ error: 'Invalid payment' });
        }
      };


const generateReceipt = async (req, res) => {
  const data = req.body;
  const htmlTemplate = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f9f9f9;
          }
          h3 {
            color: #333;
            text-align: center;
            margin-bottom: 20px;
          }
          .logo {
            display: block;
            margin: 0 auto;
          }
          .receipt {
            width: 80%;
            margin: 0 auto;
            padding: 20px;
            background-color: #fff;
            box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
            border-radius: 5px;
          }
          .receipt p {
            color: #333;
            margin: 10px 0;
          }
          .receipt strong {
            font-weight: bold;
          }

        </style>
      </head>
      <body>
      <img class="logo" src="/logo.png" alt="Company Logo" style="width: 290px;">
        <h3>Stripe Payment</h3>
        <div class="receipt">
          <h2>Receipt</h2>
          <p><strong>Customer Name:</strong> ${data.title}. ${data.name}</p>
          <p><strong>Phone Number:</strong> ${data.phone}</p>
          <p><strong>Amount Paid:</strong> ${data.amount}</p>
          <p><strong>Date and Time Stamp:</strong> ${data.date}</p>
          <p><strong>Check In:</strong> ${data.checkInDate}</p>
          <p><strong>Check In Time:</strong> ${data.checkInTime}</p>
          <p><strong>Check Out:</strong> ${data.checkOutDate}</p>
          <p><strong>Check Out Time:</strong> ${data.checkOutTime}</p>
          <p><strong>Paid To:</strong> ${data.paidTo}</p>
        </div>
      </body>
    </html>
  `;
  try {
    // Create a new browser instance using Puppeteer with new Headless mode
    const browser = await puppeteer.launch({ headless: 'new' });

    // Create a new page in the browser
    const page = await browser.newPage();

    // Set the HTML content for the page
    await page.setContent(htmlTemplate);

    // Generate the PDF buffer
    const pdfBuffer = await page.pdf({
      format: 'Letter',
      margin: {
        top: '1cm',
        right: '1cm',
        bottom: '1cm',
        left: '1cm',
      },
    });

    // Close the browser instance
    await browser.close();

    // Set the response headers for PDF download
    res.setHeader('Content-Disposition', `attachment; filename=generated-receipt-${data.name}-${Date.now()}.pdf`);
    res.setHeader('Content-Type', 'application/pdf');

    // Send the PDF buffer to the client
    res.send(pdfBuffer);
  } catch (error) {
    console.error('Error generating PDF:', error);
    res.status(500).json({ error: 'Failed to generate the receipt' });
  }
};

module.exports = { createPaymentOrder, handlePaymentCallback, generateReceipt };