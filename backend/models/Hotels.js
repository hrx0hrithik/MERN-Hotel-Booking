const mongoose = require("mongoose");

const HotelsSchema = new mongoose.Schema({
    hotelName:{
        type: String,
        required : true
    },
    location:{
        type: String,
    },
    imageUrl:{
        type: String,
        // unique:true
    },
    numbOfRoomsAvalable:{
        type: Number,
        required:true
    },
    rating:{
        type:Number,
        max:5,
        min:1,
        require:true
    },
    freeBreakfast:{
        type: Boolean,
        require:true
    },
    tag:{
        type: String
    },
    hotelId:{
        type: String,
        require: true
    },
    reservedByUser:{
        type: String,
        default: null
    },
    discountPrice:{
        type:Number,
        require: true
    },
    maxPriceRoomPerNight:{
        type:Number,
        require: true
    },
    image2:{
        type:String
    },
    image3:{
        type:String
    },
    reservation:{
        checkInDate:{
            type: String,
            default: null
        },
        checkOutDate:{
            type: String,
            default: null
        }
    }

})
const Hotel = mongoose.model("hotels", HotelsSchema, "hotels");
module.exports = Hotel;