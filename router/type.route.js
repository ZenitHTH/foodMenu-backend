const express = require("express");
const router = express.Router();

const typeShema = require("../models/type.db");

// main root use for call datas and insert data
router
  .route("/")
  .post((req, res, next) => {
    typeShema.create(req.body, (err, data) => {
      if (err) {
        next(err);
      } else {
        console.log(data);
        res.json(data);
      }
    });
  })
  .get((req, res, next) => {
    typeShema.find((err, data) => {
      if (err) {
        next(err);
      } else {
        res.json(data);
      }
    });
  });

router
  .route("/:id")
  // show a data
  .get((req, res, next) => {
    typeShema.findOne({ _id: req.params.id }, (err, data) => {
      if (err) {
        next(err);
      } else {
        res.json(data);
      }
    });
  })
  // edit data
  .put((req, res, next) => {
    typeShema.findOneAndUpdate(
      { _id: req.body._id },
      { name: req.body.name },
      (err, data) => {
        if (err) {
          next(err);
        } else {
          res.json(data);
        }
      }
    );
  })
  // delete a data
  .delete((req, res, next) => {
    typeShema.findOneAndDelete(req.params.id, (err, data) => {
      if (err) {
        next(err);
      } else {
        res.status(200).json({ msg: data });
      }
    });
  });
//delete data

module.exports = router;
