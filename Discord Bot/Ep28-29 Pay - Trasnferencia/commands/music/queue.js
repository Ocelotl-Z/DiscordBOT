const { fullQueue } = require("../../global/music");
const { getVoiceConnection } = require("@discordjs/voice");

module.exports = {
  name: "queue",
  description: "Ver lista de reproduccion",
  async execute(client, message, args, discord) {
    const pvc = getVoiceConnection(message.guild.id);
    if (!pvc) return message.reply("No se esta reproduciendo musica");

    const player = getVoiceConnection(message.guild.id).state.subscription
      .player;

    // console.log(player.state.resource.metadata.title);

    const songs = fullQueue(message.guild.id);

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

    message.reply({ embeds: [embed] });
  },
};
