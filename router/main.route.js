const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const foodShema = require("../models/food.db");
const typeShema = require("../models/type.db");
const subtypeShema = require("../models/subtype.db");
const imageShema = require("../models/image.db");

router.route("/").get(async (req, res) => {
  const data = await foodShema.find({});
  const pushData = async (data, done) => {
    const foodList = [];
    Promise.all(
      await data.map(async (f) => {
        const subtypeList = [];
        await f.idsubtype.map(async (id) => {
          const subtype = await subtypeShema.findById(id);

          subtypeList.push(subtype.name);
        });
        const type = await typeShema.findById(f.idtype);

        foodList.push({
          name: f.name,
          price: f.price,
          type: type.name,
          subtype: subtypeList,
          image: f.idimage,
        });
      })
    ).then(() => {
      done(null, foodList);
    });
  };

  pushData(data, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
      res.status(201).end();
    }
  });

  /*.exec()
    .then(() => {
      console.log(foodList);
      res.json(foodList);
      res.status(201).end();
    });*/
});

module.exports = router;
