const mongoose = require("mongoose")
const express = require("express");
const fs = require("fs");
const jet = require("jsonwebtoken")
require("dotenv").config

const router = express.Router();
const path = require("path");
const userSchema = require("../models/user.db");

router.route("/").post(async (req,res)=>{
    const { username,password } = req.body;
    const user = await userSchema.findOne({username}); 
    if(!user){
        res.status(400).send("not found username").end();
    }else{
        const token = await jwt.sign(
            {
                user_id:user._id,username 
            },
            process.env.TOKEN_KEY,
            {
                expiresIn:"1h"
            }
        )
        user.token=token;
        res.json(user).status(200).end();
    }
    res.status(201).end()

})

module.exports = router