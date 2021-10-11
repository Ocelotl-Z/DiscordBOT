const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
  userID: { type: String, require: true, unique: true },
  userName: { type: String, require: true },
  name: { type: String, default: null },
  age: { type: String, default: null },
  desc: { type: String, default: null },
});

const model = mongoose.model("usuarios", usersSchema);

module.exports = model;
