const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
  userID: { type: String, require: true, unique: true },
  userName: { type: String, require: true },
  name: { type: String, default: null },
  age: { type: String, default: null },
  desc: { type: String, default: null },
  logs: { type: Array, default: [] },
});

const model = mongoose.model("usuarios", usersSchema);

module.exports = model;

// logs = [
//   { serverId: 8, warns: [warns], ganado: [price] },
//   { serverId: 7, warns: [warns], ganado: [price] },
//   { serverId: 15, warns: [warns], ganado: [price] },
// ];
