const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
  userID: { type: String, require: true, unique: true },
  userName: { type: String, require: true, unique: true },
  serverID: { type: String, require: true },
});

const model = mongoose.model("usuarios", usersSchema);

module.exports = model;
