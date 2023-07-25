const express = require("express");
const User = require("../models/User");
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");
const fetchuser = require('../middleware/fetchusermiddleware')

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

// Router 1: Creating new user using : POST "/api/auth/createuser" 
router.post('/createuser', async (req, res) => {
  let success = false;

  try {
    // Check the email already exist
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({ success, error: "This Email already exists" });
    }

    // genetating salt and hashing password
    const salt = await bcrypt.genSalt(10)
    const secPass = await bcrypt.hash(req.body.password, salt)

    // create a user in DB
    user = await User.create({
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
        password: secPass,
      });
      const data  = {
        user:{
          id: user.id
        }
      }
      const authToken = jwt.sign(data, JWT_SECRET_KEY);

      success= true;
    res.json({success, authToken})

    } 
    catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
})

    // Router 2: Authencating a User using : POST "/api/auth/login" . No login required
router.post("/login", async (req, res) => {
    let success = false;
    const {email, password} = req.body;
    try {
      let user = await User.findOne({email});
        if(!user){
            return res.status(401).json({error: "Please try to login with correct credentials"})
    
          }
      const passwordCompare = await bcrypt.compare(password, user.password);
        if(!passwordCompare){
            success = false
            return res.status(401).json({ success, error: "Please try to login with correct credentials"})
          }
          const data  = {
            user:{
              id: user.id
            }
          }
          const authToken = jwt.sign(data, JWT_SECRET_KEY);
          success = true;
          res.json({ success, authToken})
    
      } catch (error) {
          console.error(error.message);
          res.status(500).send("Internal Server Error");
      }
    })

    // Router 3: Getting User all details using creds : POST "/api/auth/getuserdata" . login required

    router.post("/getuserdata",fetchuser, async (req, res) => {
      try {
        let userId = req.user.id;
          const user = await User.findById(userId).select("-password")
          res.send(user);
    
      }  catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
      }
   })

  module.exports = router 