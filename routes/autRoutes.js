//routes for aut
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
require("dotenv").config();

//connect to mongodb
mongoose.set("strictQuery", false);
mongoose.connect(process.env.DATABASE).then(()=>{
    console.log('connected to mongodb');
}).catch((error)=>{
    console.error('error connecting to database');
});

//user model
const User = require("../models/User");

//add new user
router.post("/register", async(req, res)=>{
    try{
        const {username, password} = req.body;

        //validate input
        if(!username || !password){
            return res.status(404).json({error: "invalid input, send username and password"});

        }
        //correct - save user
        const user = new User({username, password});
        await user.save();
        res.status(201).json({message: "User created"});

    }catch(error){
        res.status(500).json({error: "server error"});
    }
});

//login user
router.post("/login", async(req, res)=>{
   try{
    const {username, password} = req.body;

    //validate
    if(!username || !password){
        return res.status(400).json({error: "ivalid input, send username and password"});
    }
    //check credentials
    
    //does user exist?
    const user = await User.findOne({username});
    if(!user){
        return res.status(401).json({error: 'incorrect username or password'});
   }
   //check pw
   const ifPasswordMatch= await user.comparePassword(password);
   if(!ifPasswordMatch){
    return res.status(401).json({error: 'incorrect username or password'});

   }else{
    const payload = {username: username};
    const token =jwt.sign(payload, process.env.JWT_SECRET_KEY, {expiresIn: '1h'});
    const response = {
        message: 'user logged in',
        token: token
    }
    res.status(200).json({response});
   }
   }catch(error){
    res.status(500).json({error: 'server error'});
   }
});

module.exports = router;