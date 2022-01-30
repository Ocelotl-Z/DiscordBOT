const mongoose = require("mongoose");

const economySchema = new mongoose.Schema({
  userID: { type: String, require: true },
  serverID: { type: String, require: true },
  wallet: { type: Number, default: 500 },
  bank: { type: Number, default: 1000 },
});

const model = mongoose.model("economy", economySchema);

module.exports = model;
