const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let imageSchema = new Schema({
  name: { type: String, require: true },
  path: { type: String, require: true },
  img: { data: Buffer, contentType: String },
});

module.exports = mongoose.model("imageSchema", imageSchema);
