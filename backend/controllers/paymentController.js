const Razorpay = require('razorpay');
const pdfkit = require('pdfkit');
const fs = require('fs');
const https = require('https');
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
      
        const text = `${razorpay_order_id}|${razorpay_payment_id}`;
        const secret = process.env.RAZORPAY_API_SECRET; 
      
        const generated_signature = crypto
          .createHmac('sha256', secret)
          .update(text)
          .digest('hex');
      
        if (generated_signature === razorpay_signature) {
          res.json({ transactionStatus: 'success', totalAmountPaid: amount });
        } else {
          res.status(400).json({ error: 'Invalid payment' });
        }
      };

      const generateReceipt = async (req, res) => {
        const data = req.body;

        const logoUrl = 'https://mern-hotel-booking.up.railway.app/logo/logo.png';
        const logoPath = 'logo.png'; // Save the image as logo.png in the current directory
        const file = fs.createWriteStream(logoPath);
      
        https.get(logoUrl, (response) => {
          response.pipe(file);
        });
      
        // Wait for the image to be downloaded
        await new Promise((resolve) => {
          file.on('finish', () => {
            file.close(resolve);
          });
        });
      
        // Create a new PDF document using pdfkit
        const doc = new pdfkit();
        doc.pipe(res);
        const fontPath = 'public/fonts/Rubik-Medium.ttf'; // Replace with the actual path to your font file
        doc.font(fontPath);
           // Start a new transformation block for the logo
        doc.save();
        // Shift the starting position of the logo to the right
        const xOffset = 140; // Adjust the value as needed
        const yOffset = 0; // No vertical shift in this case
        doc.translate(xOffset, yOffset);

        doc.image('public/logo.png', { fit: [203, 70] }); // Use the local file path for the logo image

        // Restore the original transformation
        doc.restore();

        doc.fontSize(14).text('Razorpay Payment', { align: 'center' });
        doc.moveDown(1);
      
        doc.fontSize(18).text('Receipt', { align: 'center' });
        doc.moveDown(1);
      
        doc.fontSize(14).text(`Customer Name:   ${data.title}. ${data.name}\n`);
        doc.fontSize(14).text(`Phone Number:   ${data.phone}\n`);
        doc.fontSize(14).text(`Date and Time Stamp:   ${data.date}\n`);
        doc.fontSize(14).text(`Amount Paid:   ₹${data.amount}\n`);
        doc.fontSize(14).text(`Paid To:   ${data.paidTo}`);
        doc.fontSize(14).text(`Check In:   ${data.checkInDate}\n`);
        doc.fontSize(14).text(`Check In Time:   ${data.checkInTime}\n`);
        doc.fontSize(14).text(`Check Out:   ${data.checkOutDate}\n`);
        doc.fontSize(14).text(`Check Out Time:   ${data.checkOutTime}\n`);
        doc.end(); // End the PDF document
      
        // Set the response headers for PDF download
        res.setHeader('Content-Disposition', `attachment; filename=generated-receipt-${data.name}-${Date.now()}.pdf`);
        res.setHeader('Content-Type', 'application/pdf');
      };

module.exports = { createPaymentOrder, handlePaymentCallback, generateReceipt };