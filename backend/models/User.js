const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required : true
    },
    phone:{
        type: Number,
        required: true
    },
    profileImg:{
        imgBuffer:{
            data: Buffer
        }
    },
    email:{
        type: String,
        required: true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    createdAt:{
        type: Date,
        default: Date.now,
        immutable: true
    },
    updatedAt:{
        type: Date,
        default: Date.now
    },
    address:{
        type:String,
        default: null
    },
    state:{
        type:String,
        default: null
    },
    pinCode:{
        type: String,
        default: null,
        minLength: 6
    },
    booking:[{
        reservation:{
            checkInDate: {
                type: String,
                default: null
            },
            checkOutDate: {
                type: String,
                default: null
            }
        },
        hotelId: {
            type: String,
            default: null
        },
        bookingStatus: {
            type: String,
            default: "None"
        },
        paymentInfo:{
            totalPaid:{
                type: Number,
                default: 0
            },
            paidAt:{type : Date},
        }
    }]
})
const User = mongoose.model("user", UserSchema, "users");
module.exports = User;