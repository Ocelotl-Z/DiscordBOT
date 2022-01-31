const economyModel = require("../../models/economySchema");

const balance = async (userID, serverID, type) => {
  const money = await economyModel.findOne({
    userID,
    serverID,
  });

  if (type == "cartera") {
    return money.wallet;
  } else {
    return money.bank;
  }
};

module.exports = {
  name: "balance",
  description: "saldo del usuario",
  options: [
    {
      name: `cartera`,
      description: `saldo en cartera`,
      type: `SUB_COMMAND`,
      required: false,
    },
    {
      name: `banco`,
      description: `saldo en el banco`,
      type: `SUB_COMMAND`,
      required: false,
    },
  ],
  run: async (client, interaction) => {
    const { user, guildId } = interaction;

    const type = interaction.options.getSubcommand();

    const dinero = await balance(user.id, guildId, type);

    const embed = {
      author: { name: "Economia", icon_url: "" },
      title: type,
      description: `Cuentas con $ ${dinero} en ${type}`,
      timestamp: Date.now(),
    };

    interaction.reply({ ephemral: true, embeds: [embed] });
  },
};
