require("dotenv").config()

module.exports = {

  db: `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.gtalbjy.mongodb.net/foodMenu?retryWrites=true&w=majority`,
  localdb:"mongodb://localhost:27017/foodMenu"
};
