const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let imageSchema = new Schema({
  name: { type: String, require: true },
});

module.exports = mongoose.model("imageSchema", imageSchema);
