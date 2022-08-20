const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let userSchema = new Schema({
  username: { type: String, required: true },
  passwordhash: { type: String, require: true },
  token:{type:String}
});

module.exports = mongoose.model("user",userSchema);