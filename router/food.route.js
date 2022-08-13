const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const uuid = require("uuid");

const foodShema = require("../models/food.db");
const imageSchema = require("../models/image.db");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, `${uuid.v4()}.${file.mimetype.split("/")[1]}`);
  },
});
const upload = multer({ storage });

//create food
router
  .route("/")
  .post(upload.single("photos"), async (req, res) => {
    /*
        request JSON
        {
            idtype:objectid
            idsubtype:[objectid...]
            idImage :Objectid
            name:namefood
            price:pricefood
        }
    */
    async function imagefetch() {
      const img = fs.readFileSync(req.file.path);
      const encode_img = img.toString("base64");
      // const schemaImg = {
      //   name: req.file.filename,
      //   img: {
      //     contentType: req.file.mimetype,
      //     data: Buffer.from(encode_img, "base64"),
      //   },
      // };
      const schemaImg = {
        name:req.file.filename
      };

      imageSchema.create(schemaImg, (err, result) => {
        if (err) {
          console.log(err);
        } else {
          console.log("Saved Photo to database");
        }
      });
    }
    imagefetch().then(async () => {
      var findidbyname = function (name, done) {
        imageSchema.findOne({ name }, (err, result) => {
          if (err) {
            console.log(err);
          } else {
            done(null, result);
          }
        });
      };
      findidbyname(req.file.filename, (err, result) => {
        console.log(result._id);
        const foodShemaModel = {
          name: req.body.namefood,
          price: req.body.pricefood,
          idtype: req.body.idtype,
          idsubtype: req.body.idsubtype,
          idimage: result._id,
        };

        foodShema.create(foodShemaModel, (err, data) => {
          if (err) {
            console.log(err);
          } else {
            res.json(data);
            res.status(201).end();
          }
        });
      });
    });
  })
  .get((req, res, next) => {
    foodShema.find((err, data) => {
      if (err) {
        console.log(err);
        next(err);
      } else {
        res.json(data);
        res.status(200).end();
      }
    });
  });

//delete food

//edit food

module.exports = router;
