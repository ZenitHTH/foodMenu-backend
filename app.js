const express = require("express"),
  session = require("express-session"),
  bodyParser = require("body-parser"),
  cors = require("cors"),
  mongoose = require("mongoose"),
  path = require("path");
const dbConfig = require("./dbConfig/db");
const foodRoute = require("./router/food.route");
const typeRoute = require("./router/type.route");
const subtypeRoute = require("./router/subtype.route");
const mainRoute = require("./router/main.route");
const imageRoute = require("./router/image.route");

//MongoDB
mongoose.Promise = global.Promise;
//conecting DB
mongoose
  .connect(dbConfig.db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(
    () => {
      console.log("Connect DB Sucessful.");
    },
    (err) => {
      console.log(err);
    }
  );

//Express
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//route call
app.use(cors());
app.use("/", mainRoute);
app.use("/type", typeRoute);
app.use("/subtype", subtypeRoute);
app.use("/food", foodRoute);
app.use("/image",imageRoute)

//Server config
const port = process.env.port || 4000;
const server = app.listen(port, () => {
  console.log("server start at port " + port);
});

//Error Handdle
