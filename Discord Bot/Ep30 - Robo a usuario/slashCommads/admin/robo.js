const {
  sucMoney,
  addMoney,
  checkMoney,
  getMoney,
} = require("../../global/economia");

module.exports = {
  name: "robo",
  description: "Roba a un usuario (Multa $100)",
  options: [
    {
      name: `usuario`,
      description: `Nombre de la victima`,
      type: `USER`,
      required: true,
    },
  ],
  run: async (client, interaction) => {
    const { guildId, options, user } = interaction;

    const userV = options.getUser("usuario");

    if (userV.bot) {
      return interaction.reply("No se puede interactuar con bots");
    }

    if (user.id == userV.id) {
      return interaction.reply("No puedes robarte a ti mismo");
    }

    if (!(await checkMoney(user.id, guildId, "cartera", 100))) {
      return interaction.reply(
        "No cuentas con el dinero suficiente para realizar esta actividad"
      );
    }

    //# Dinero del usuario a atracar
    const userVmoney = await getMoney(userV.id, guildId);

    if (userVmoney == null) {
      return interaction.reply("Este usuario no puede ser atracado aun");
    }

    //% Probabilidad 1/4
    const check = Math.floor(Math.random() * (2 - 1)) + 1;

    if (check != 1) {
      sucMoney(user.id, guildId, "cartera", 100);
      return interaction.reply("Atraco fallido, seras multado con $100");
    }

    //# Atraco

    let amountR = 100;

    if (userVmoney.wallet >= 200) {
      //# Maximo = 200
      //% Minimo = 100
      amountR = Math.floor(Math.random() * (200 - 100)) + 100;
    } else if (userVmoney.wallet >= 100 && userVmoney.wallet < 200) {
      //# Maximo = Dinero en la cartera de la victima
      //% Minimo = 100
      amountR = Math.floor(Math.random() * (userVmoney.wallet - 100)) + 100;
    } else {
      amountR = Math.floor(Math.random() * (150 - 100)) + 100;
      addMoney(user.id, guildId, "cartera", amountR);
      sucMoney(userV.id, guildId, "cartera", userVmoney.wallet);

      return interaction.reply(`Robo exitoso, cantidad robada ${amountR}`);
    }

    sucMoney(userV.id, guildId, "cartera", amountR);
    addMoney(user.id, guildId, "cartera", amountR);
    return interaction.reply(`Robo exitoso, cantidad robada ${amountR}`);
  },
};
