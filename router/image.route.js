const mongoose = require("mongoose");
const express = require("express");
const multer = require("multer");
const fs = require("fs");
const uuid = require("uuid");

const router = express.Router();
const imageSchema = require("../models/image.db");
const path = require("path");

router.route("/:idimage").get((req, res) => {
  var filename = function (id, done) {
    imageSchema.findById({ _id:id }, (err, result) => {
      if (err) {
        console.log(err);

      } else {
        done(null, result);
      }
    });
  };
  filename(req.params.idimage, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result)
      res.sendFile(path.resolve(`./uploads/${result.name}`));
    }
  });
});

module.exports = router;
