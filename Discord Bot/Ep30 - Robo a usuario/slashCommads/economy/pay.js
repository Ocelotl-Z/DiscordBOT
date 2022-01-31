const { sucMoney, addMoney, checkMoney } = require("../../global/economia");

module.exports = {
  name: "pay",
  description: "Paga a otro jugador",
  options: [
    {
      name: `usuario`,
      description: `Usuario a pagar`,
      type: `USER`,
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
    const usuario = options.getUser("usuario");

    if (usuario.bot)
      return interaction.reply("No puedes transferirle a un bot");

    const check = await sucMoney(user.id, guildId, "cartera", amount);

    if (!check) return interaction.reply("No tienes fondos suficientes");

    const add = await addMoney(usuario.id, guildId, "cartera", amount);

    if (!add) {
      //# Si falla la tranferencia se le regresa el dinero al usuario original
      addMoney(user.id, guildId, "cartera", amount);
      return interaction.reply("No se pudo realisar la trasnferencia");
    }

    return interaction.reply("Transferencia exitosa");
  },
};
