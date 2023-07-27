const express = require('express');
const connectToMongo = require("./db");
var cors = require('cors');
const paymentRoutes = require('./routes/paymentRoutes');
const multer = require('multer');

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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
