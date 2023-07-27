const Razorpay = require('razorpay');
const pdfkit = require('pdfkit');
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
      
        // Create a new PDF document using pdfkit
        const doc = new pdfkit();
        doc.pipe(res); // Pipe the PDF directly to the response
      
        // Customize the PDF content
        doc.image('https://mern-hotel-booking.up.railway.app/logo/logo.png', {
          fit: [290, 100], // Adjust the logo size
        });
        doc.fontSize(14).text('Razorpay Payment', { align: 'center' });
        doc.moveDown(1);
      
        doc.fontSize(20).text('Receipt', { align: 'center' });
        doc.moveDown(1);
      
        doc.fontSize(14).text(`Customer Name: ${data.title}. ${data.name}`);
        doc.fontSize(14).text(`Phone Number: ${data.phone}`);
        doc.fontSize(14).text(`Amount Paid: ${data.amount}`);
        doc.fontSize(14).text(`Date and Time Stamp: ${data.date}`);
        doc.fontSize(14).text(`Check In: ${data.checkInDate}`);
        doc.fontSize(14).text(`Check In Time: ${data.checkInTime}`);
        doc.fontSize(14).text(`Check Out: ${data.checkOutDate}`);
        doc.fontSize(14).text(`Check Out Time: ${data.checkOutTime}`);
        doc.fontSize(14).text(`Paid To: ${data.paidTo}`);
        doc.end(); // End the PDF document
      
        // Set the response headers for PDF download
        res.setHeader('Content-Disposition', `attachment; filename=generated-receipt-${data.name}-${Date.now()}.pdf`);
        res.setHeader('Content-Type', 'application/pdf');
      };

module.exports = { createPaymentOrder, handlePaymentCallback, generateReceipt };