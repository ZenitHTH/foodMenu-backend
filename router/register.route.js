const mongoose = require("mongoose");
const express = require("express");
const bcrypt = require("bcryptjs");
const fs = require("fs");
const jwt = require("jsonwebtoken");

const router = express.Router();
const path = require("path");
const userSchema = require("../models/user.db");
const { resolve } = require("path");
require("dotenv").config();

router.route("/").post(async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await userSchema.findOne({ username: username });
    console.log(user)
    if (!user) {
      bcrypt.genSalt(10, (error, salt) => {
        if (error) {
          console.error("GenSalt Error", error);
        }
        console.log(`salt:${salt}`)
        bcrypt.hash(password, salt, async (error, hash) => {
          if (error) {
            console.error("HashPassword Error", error);
          }
          console.log(`hash:${hash}`)
          const newUser = await userSchema.create({
            username: username,
            passwordhash: hash
          });
          console.log(`newUser:${newUser}`)
          const token = await jwt.sign(
            { user_id: newUser._id, username },
            process.env.TOKEN_KEY,
            { expiresIn: "1h" }
          );
          console.log(token)
          newUser.token = token;
          res.status(200).json({username:newUser.username,_id:newUser._id}).end();
        });
      });
    } else {
      if(!username) console.log("forgot username");
      if(!password) console.log("forgot password");
      
      res.status(400).send("Register have problem").end();
    }
  } catch (err) {
    console.log(err);
  }
  res.status(201).end();
});

module.exports = router;
