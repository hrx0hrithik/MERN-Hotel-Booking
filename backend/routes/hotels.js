const express = require("express");
const router = express.Router();
const Hotel = require('../models/Hotels');
const User = require('../models/User');
const fetchuser = require("../middleware/fetchusermiddleware");
// const mongoose = require('mongoose');

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
  const newBooking = {
    reservation: {
        checkInDate: reservation.checkInDate,
        checkOutDate: reservation.checkOutDate
    },
    hotelId: hotelId,
    bookingStatus: bookingStatus,
    paymentInfo: {
        totalPaid: paymentInfo.totalAmountPaid,
        paidAt: new Date()
    }
};
  try { //find the hotel and update its reservation 
    let updatedHotel = await Hotel.findByIdAndUpdate(hotelId, { $set: {"reservation": reservation, "reservedByUser": userId } });
    // update user with hotel booking and payment details

    let updateUserQuery = { $push: { "booking": newBooking } };

    if (billingAdd && pinCode && state) {
        updateUserQuery.$set = {
            "address": billingAdd,
            "pinCode": pinCode,
            "state": state
        };
    }

    let updateUser = await User.findByIdAndUpdate(userId, updateUserQuery, { new: true });

    res.json(updateUser);
    // console.log(req.body)
    // console.log(newBooking)

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
})

// ROUTE 4: Canceling Hotel Room Booking : PUT "/api/avalablehotels/cancelbooking". Login required

router.put('/cancelbooking', fetchuser, async (req, res)=>{
  const { hotelId, bookingId } = req.body;
  const userId = req.user.id;
  try {
  let hotel = await Hotel.findByIdAndUpdate(hotelId, { $set: { "reservation.checkInDate" : "", "reservation.checkOutDate" : "", reservedByUser: ""} })

  let updateUser = await User.findOneAndUpdate(
    {
      _id: userId,
      "booking._id": bookingId
    },
    {
      $set: { "booking.$.bookingStatus": "Canceled" }
    },
    { new: true }
  );
  res.json(updateUser);

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