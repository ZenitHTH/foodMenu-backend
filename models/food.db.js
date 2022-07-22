const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let foodSchema = new Schema({
  idtype: mongoose.Types.ObjectId,
  idsubtype: [mongoose.Types.ObjectId],
  idimage: mongoose.Types.ObjectId,
  name: String,
  price: Number,
});

module.exports = mongoose.model("food", foodSchema);

module.exports.save = (model, data) => {
  model.save(data);
};
