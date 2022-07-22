const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let typeSchema = new Schema({
  name: String,
});

module.exports = mongoose.model("type", typeSchema);

module.exports.saveProduct = (model, data) => {
  model.save(data);
};
