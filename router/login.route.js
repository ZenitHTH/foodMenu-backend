const express = require("express");
const fs = require("fs");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config;

const router = express.Router();
const path = require("path");
const userSchema = require("../models/user.db");

router.route("/").post(async (req, res) => {
  const { username, password } = req.body;
  const user = await userSchema.findOne({ username });
  if (!user) {
    res.status(400).send("not found username").end();
  } else {
    if (password.length > 0) {
      bcrypt.compare(password, user.passwordhash, async (error, result) => {
        if (error) {
          console.error("bcrypt compare error", error);
        }
        if (result === true) {
          const token = await jwt.sign(
            {
              user_id: user._id,
              username,
            },
            process.env.TOKEN_KEY,
            {
              expiresIn: "1h",
            }
          );

          user.token = token;
          res.status(200).json({ user });
        } else {
           res.send("missmatch password").status(201).end();
        }
      });
    } else {
        res.send("Password is empty").status(201).end()
    }
  }
});

module.exports = router;
