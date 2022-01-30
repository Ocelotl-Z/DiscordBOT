const economyModel = require("../models/economySchema");

const checkMoney = async (userID, serverID, type, amount) => {
  const money = await economyModel.findOne({
    userID,
    serverID,
  });

  if (type == "cartera") {
    return money.wallet >= amount ? true : false;
  } else {
    return money.bank >= amount ? true : false;
  }
};

const addMoney = async (userID, serverID, type, amount) => {
  if (type == "cartera") {
    economyModel
      .findOneAndUpdate(
        {
          userID,
          serverID,
        },
        {
          $inc: { wallet: amount },
        }
      )
      .then(console.log)
      .catch(console.log);
    return true;
  } else if (type == "bank") {
    economyModel
      .findOneAndUpdate(
        {
          userID,
          serverID,
        },
        {
          $inc: { bank: amount },
        }
      )
      .then(console.log)
      .catch(console.log);
    return true;
  } else {
    return false;
  }
};

const sucMoney = async (userID, serverID, type, amount) => {
  if (type == "cartera") {
    const check = await checkMoney(userID, serverID, type, amount);
    if (check) {
      economyModel
        .findOneAndUpdate(
          {
            userID,
            serverID,
          },
          {
            $inc: { wallet: amount * -1 },
          }
        )
        .then(console.log)
        .catch(console.log);
      return true;
    } else {
      return false;
    }
  } else if (type == "bank") {
    const check = await checkMoney(userID, serverID, type, amount);
    if (check) {
      economyModel
        .findOneAndUpdate(
          {
            userID,
            serverID,
          },
          {
            $inc: { bank: amount * -1 },
          }
        )
        .then(console.log)
        .catch(console.log);
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
};

module.exports = {
  addMoney,
  checkMoney,
  sucMoney,
};

//SCHEMA
//      userID: { type: String, require: true },
//      serverID: { type: String, require: true },
//      wallet: { type: Number, default: 500 },
//      bank: { type: Number, default: 1000 },
