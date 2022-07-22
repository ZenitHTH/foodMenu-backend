const express = require("express");
const router = express.Router();

const subtypeSchema = require("../models/subtype.db");

router
  .route("/")
  .get((req, res) => {
    subtypeSchema.find((err, data) => {
      if (err) {
        console.log(err);
      } else {
        res.json(data);
      }
    });
  })

  .post((req, res) => {
    subtypeSchema.create(req.body, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        res.json(data);
      }
    });
  });

router
  .route("/:id")
  .get((req, res) => {
    subtypeSchema.findOne({ _id: req.params.id }, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        res.json(data);
      }
    });
  })
  .put((req, res) => {
    subtypeSchema.findByIdAndUpdate(
      req.body.id,
      { name: req.body.name },
      (err, data) => {
        if (err) {
          console.log(err);
        } else {
          res.json(data);
        }
      }
    );
  })
  .delete((req, res) => {
    subtypeSchema.findByIdAndDelete(req.body.id, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        res.json(data);
      }
    });
  });

module.exports = router;
