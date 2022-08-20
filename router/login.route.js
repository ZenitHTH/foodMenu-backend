const mongoose = require("mongoose")
const express = require("express");
const fs = require("fs");

const router = express.Router();
const path = require("path");
const userSchema = require("../models/user.db");

router.route("/").post((req,res)=>{
    const { username,password } = req.body;
    if(!userSchema.findOne({username})){
        console.log("dont have this username")
    }else{
        console.log("already have this username")
    }
    res.status(201).end()

})

module.exports = router