const { loopQueue } = require("../../global/music");
module.exports = {
  name: "loop",
  description: "Loopea las canciones",
  run: async (client, interaction) => {
    const loop = loopQueue(interaction.guild.id);

    if (loop == "SN") return interaction.reply("Sin cacniones");
    if (!loop) return interaction.reply("Loop descativado");
    if (loop) return interaction.reply("Loop activado");
  },
};
