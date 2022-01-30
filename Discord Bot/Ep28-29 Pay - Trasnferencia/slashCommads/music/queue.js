const { fullQueue } = require("../../global/music");
const { getVoiceConnection } = require("@discordjs/voice");

module.exports = {
  name: "queue",
  description: "Muestra la lista de reproduccion",
  run: async (client, interaction) => {
    const pvc = getVoiceConnection(interaction.guild.id);
    if (!pvc) return interaction.reply("No se esta reproduciendo musica");

    const songs = fullQueue(interaction.guild.id);

    const embed = {
      author: {
        name: "OCELOTL MUSIC",
        icon_url:
          "https://png.pngtree.com/png-vector/20190830/ourlarge/pngtree-music-icon-design-vector-png-image_1714137.jpg",
      },
      title: "Lista de reproduccion",
      description: "Lista de reproduccion:\n\n" + songs.join(""),
      color: "RED",
    };

    interaction.reply({ embeds: [embed] });
  },
};
