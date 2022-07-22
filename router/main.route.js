const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const foodShema = require("../models/food.db");
const typeShema = require("../models/type.db");
const subtypeShema = require("../models/subtype.db");
const imageShema = require("../models/image.db");

router.route("/").get((req, res) => {
  //get allfoodlist with objectid
  foodShema.find({}, async (err, data) => {
    //set empty array waiting push a data
    const subtypeList = [];
    const foodList = [];
    if (err) console.log(err);
    //push subtype's name into subtypelist
    const fetchData = await data.map(async (f) => {
      console.log(f);
      await f.idsubtype.map(async (id) => {
        const subtype = await subtypeShema.findById(id);

        subtypeList.push(subtype.name);
      });

      // push food data's name into foodlist
      const type = await typeShema.findById(f.idtype);
      foodList.push({
        name: f.name,
        price: f.price,
        type: type.name,
        subtype: subtypeList,
        image: async (idimage) => {
          return await imageShema.findById(idimage);
        },
      });
    });
    //show data food without objectid
    Promise.all(fetchData).then(() => {
      res.json(foodList);
      res.status(201).end();
    });
  });
});

module.exports = router;
