const express = require("express");
const router = express.Router();
const Hotel = require('../models/Hotels');
const User = require('../models/User');
const fetchuser = require("../middleware/fetchusermiddleware");

// ROUTE 1: Get all avalable hotels using : POST "/api/avalablehotels". No Login required

router.post('/', async (req,res) =>{
    try {
      const hotels = await Hotel.find({
        $or: [
          { "reservation.checkInDate": { $gte: req.body.reservation.checkOutDate } },  // Available after check_out
          { "reservation.checkOutDate": { $lte: req.body.reservation.checkInDate } },     // Available before check_in
          { "reservation.checkOutDate": { $eq: "" } },
          { "reservation.checkInDate": { $eq: "" } }
        ]
      });
        res.json(hotels)
    }catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
})

// ROUTE 2: Get specific hotel details and selecting room using : GET "/api/avalablehotels/hoteldetails". No Login required

router.get('/hoteldetails/:id',async (req, res)=>{
  try{
    const hotel = await Hotel.findById(req.params.id)
    res.json(hotel)
  }catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
})

// ROUTE 3: Booking Hotel Room  : PUT "/api/avalablehotels/booking". Login required

router.put('/booking', fetchuser, async (req, res)=>{
  const { reservation, hotelId, paymentInfo, bookingStatus, billingAdd, pinCode, state } = req.body;
  const userId = req.user.id;
  try { //find the hotel and update its reservation 
    let updatedHotel = await Hotel.findByIdAndUpdate(hotelId, { $set: {"reservation": reservation, "reservedByUser": userId } });
    // update user with hotel booking and payment details
    let updateUser = await User.findByIdAndUpdate(userId, { $set:{ "booking.reservation": reservation, "booking.paymentInfo": paymentInfo, "booking.hotelId": hotelId, "booking.bookingStatus": bookingStatus } })
    res.json(updateUser);
    // console.log(req.body, paymentInfo)
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
})

// ROUTE 4: Canceling Hotel Room Booking : PUT "/api/avalablehotels/cancelbooking". Login required

router.put('/cancelbooking', fetchuser, async (req, res)=>{
  const { hotelId } = req.body;
  const userId = req.user.id;
  try {
  let hotel = await Hotel.findByIdAndUpdate(hotelId, { $unset: { "reservation.checkInDate" : "", "reservation.checkOutDate" : "", reservedByUser: ""} })

  let updateUser = await User.findByIdAndUpdate(userId, { $unset:{ "booking.reservation": "", "booking.paymentInfo": "", "booking.hotelId": "", "booking.bookingStatus": "" } })

  res.json(hotel);
    
  }catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
})

// ROUTE 5: Adding New Hotel in database : POST "/api/avalablehotels/addhotel" (NOT FOR USER)

router.post('/addhotel', async (req, res)=>{
  const newHotel = req.body;
  try {
    const hotel = new Hotel(newHotel);
    const saveHotel = hotel.save();
    res.json(saveHotel)
    
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
})


module.exports = router;