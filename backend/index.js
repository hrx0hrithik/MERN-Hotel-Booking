const express = require('express');
const connectToMongo = require("./db");
const User = require("./models/User");
const paymentRoutes = require('./routes/paymentRoutes');
var cors = require('cors');
const multer = require('multer');
const cron = require('node-cron');


const app = express();
const port = process.env.PORT;

app.use(cors({ origin: "*", optionsSuccessStatus: 200 }));
app.use(express.json());
app.use('/api/payment', paymentRoutes);

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

app.get("/", (req, res) => {
  res.send("Welcome to the Hotel API");
});

async function updateBookingStatus() {
  const users = await User.find();

  for (const user of users) {
    for (const booking of user.booking) {
      const checkOutDate = new Date(booking.reservation.checkOutDate);
      const today = new Date();

      console.log(`Checking booking for user ${user.name}, checkOutDate: ${checkOutDate}, today: ${today}`);

      if (checkOutDate < today && booking.bookingStatus === 'Success' && booking.bookingStatus !== 'Expired') {
        console.log(`Updating booking status for user ${user.name}`);
        booking.bookingStatus = 'Expired';
      }
    }

    await user.save(); // Make sure to await the save operation
  }
}


// Run the updateBookingStatus function every day at midnight
cron.schedule('0 0 * * *', async () => {
  try {
    await updateBookingStatus();
    console.log('Booking status updated');
  } catch (err) {
    console.error('Error updating booking status:', err);
  }
});

app.get("/update-booking-status", async (req, res) => {
  try {
    await updateBookingStatus();
    console.log('Booking status updated');
    res.status(200).json({ message: 'Booking status updated' });
  } catch (err) {
    console.error('Error updating booking status:', err);
    res.status(500).json({ error: 'Error updating booking status' });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
