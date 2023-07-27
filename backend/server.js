const express = require('express');
const app = express();
const Razorpay = require('razorpay');
const paymentRoutes = require('./routes/paymentRoutes');

const instance = new Razorpay({
    key_id: 'rzp_test_MmH7RMh9ds3u1o',
    key_secret: 'qnoXMBRD8iD0DyXcSzDfPlkH'
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/payment', paymentRoutes);

const port = 5000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

// app.post('/create-checkout-session', async (req, res) => {
//   const { hotelBookingDetails, guestDetails } = req.body;
//   // console.log(hotelBookingDetails)
//    const totalAmount = hotelBookingDetails.totalAmount * 100;
//   try {
//    const session = await stripe.checkout.sessions.create({
//       payment_method_types: ['card'],
//       mode: 'payment',
//       customer_email: guestDetails.billEmail,
//       line_items: [{
//         price_data: {
//           currency: 'inr',
//           unit_amount: totalAmount,
//           product_data: {
//             name: hotelBookingDetails.hotelName,
//             description: 'None',
//             images: [hotelBookingDetails.imageUrl],
//           },
//         },
//         quantity: 1,
//       }],
//         success_url: process.env.SUCCESS_URL ,
//         cancel_url: process.env.CANCEL_URL
//       });
//       res.json({ url: session.url });
//   }catch (error) {
//     console.error(error.message);
//     res.status(500).send("Internal Server Error");
//   }
// });