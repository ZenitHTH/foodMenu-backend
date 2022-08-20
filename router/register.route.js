const mongoose = require("mongoose");
const express = require("express");
const bcrypt = require("bcrypt");
const fs = require("fs");
const jwt = require("jsonwebtoken");

const router = express.Router();
const path = require("path");
const userSchema = require("../models/user.db");
require("dotenv").config()

router.route("/").post(async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await userSchema.findOne({ username:username });
    const passwordhash = bcrypt.genSalt(10,(err,salt)=>{
        if(err) console.log(err)
        return bcrypt.hash(password,salt,(err,hash)=>hash);
    })
    if (!user) {
      const newUser = await userSchema.create({
        username:username,
        passwordhash: passwordhash
      });
      const token = await jwt.sign(
        { user_id: newUser._id, username },
        process.env.TOKEN_KEY,
        { expiresIn: "1h" }
      );
      newUser.token = token;
      res.json(newUser).status(200).end();
    } else {
      console.log("already have this username");
      res.status(400).send("Duplicate Username").end();
    }
  } catch (err) {
    console.log(err);
  }
  res.status(201).end();
});

module.exports = router;
