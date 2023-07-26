const express = require('express')
const connectToMongo = require("./db");
var cors = require('cors')
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const pdf = require('html-pdf');

const app = express();
const port = process.env.PORT
const stripe = require('stripe')(process.env.STRIPE_SECRECT_KEY)

app.use(cors({ origin: "*",optionsSuccessStatus:200 }));
app.use(express.json());

connectToMongo();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, 'logo-' + uniqueSuffix + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

app.use("/api/auth", require("./routes/authentication"));
app.use("/api/avalablehotels", require("./routes/hotels"));

app.use('/logo', express.static('public'));

app.get("/",(req,res)=>{
  res.send("Welcome to the Hotel API")
})

app.post('/create-checkout-session', async (req, res) => {
  const { hotelBookingDetails, guestDetails } = req.body;
  // console.log(hotelBookingDetails)
   const totalAmount = hotelBookingDetails.totalAmount * 100;
  try {
   const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      customer_email: guestDetails.billEmail,
      line_items: [{
        price_data: {
          currency: 'inr',
          unit_amount: totalAmount,
          product_data: {
            name: hotelBookingDetails.hotelName,
            description: 'None',
            images: [hotelBookingDetails.imageUrl],
          },
        },
        quantity: 1,
      }],
        success_url: process.env.SUCCESS_URL ,
        cancel_url: process.env.CANCEL_URL
      });
      res.json({ url: session.url });
  }catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// Generate PDF receipt
app.post('/generate-receipt', upload.single('logo'), (req, res) => {
  const data = req.body;

  // HTML template for the receipt
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
          <p><strong>Customer Name:</strong>${data.title}. ${data.name}</p>
          <p><strong>Phone Number:</strong> ${data.phone}</p>
          <p><strong>Amount Paid:</strong> ${data.amount}</p>
          <p><strong>Date and Time Stamp:</strong> ${data.date}</p>
          <p><strong>Check In:</strong> ${data.checkInDate}</p>
          <p><strong>Check In Time:</strong> ${data.chechInTime}</p>
          <p><strong>Check Out:</strong> ${data.chechOutDate}</p>
          <p><strong>Check Out Time:</strong> ${data.chechOutTime}</p>
          <p><strong>Paid To:</strong> ${data.paidTo}</p>

        </div>
      </body>
    </html>
  `;

  // Options for the PDF generation
  const options = {
    format: 'Letter',
    border: {
      top: '1cm',
      right: '1cm',
      bottom: '1cm',
      left: '1cm'
    }
  };

  // Generate the PDF
  pdf.create(htmlTemplate, options).toFile(`generated-receipt-${data.name}-${Date.now()}.pdf`, (err, response) => {
    if (err) {
      console.error('Error generating PDF:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    const filePath = response.filename;

    // Set the appropriate headers to make the file downloadable
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=generated-receipt-${data.name}-${Date.now()}.pdf`);
    
    fs.createReadStream(filePath).pipe(res);
  });
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
