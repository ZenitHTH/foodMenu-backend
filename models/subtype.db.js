const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let subtypeSchema = new Schema({
  name: String,
});

module.exports = mongoose.model("subtype", subtypeSchema);

module.exports.saveProduct = (model, data) => {
  model.save(data);
};
