const { sucMoney, addMoney, checkMoney } = require("../../global/economia");

module.exports = {
  name: "transferencia",
  description: "Transfiere entre tus ceuntas",
  options: [
    {
      name: `tipo`,
      description: `Elige a donde vas a transferir`,
      type: 3,
      choices: [
        { name: "Banco", value: "banco" },
        { name: "Cartera", value: "cartera" },
      ],
      required: true,
    },
    {
      name: `cantidad`,
      description: `Dinero a pagar`,
      type: `NUMBER`,
      required: true,
    },
  ],
  permissions: [""],
  run: async (client, interaction) => {
    const { user, guildId, options } = interaction;

    const amount = options.getNumber("cantidad");
    const tipo = options.getString("tipo");

    if (usuario.bot)
      return interaction.reply("No puedes transferirle a un bot");

    let check;

    if (tipo == "banco") {
      check = await sucMoney(user.id, guildId, "cartera", amount);
    } else {
      check = await sucMoney(user.id, guildId, "banco", amount);
    }

    if (!check) return interaction.reply("No tienes fondos suficientes");

    const add = await addMoney(usuario.id, guildId, tipo, amount);

    if (!add) {
      //# Si falla la tranferencia se le regresa el dinero al lugar original
      if (tipo == "banco") {
        addMoney(user.id, guildId, "cartera", amount);
      } else {
        addMoney(user.id, guildId, "banco", amount);
      }

      return interaction.reply("No se pudo realisar la trasnferencia");
    }

    return interaction.reply("Transferencia exitosa");
  },
};
