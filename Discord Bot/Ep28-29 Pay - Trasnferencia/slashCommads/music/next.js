const { getVoiceConnection } = require("@discordjs/voice");

const { nextSong } = require("../../global/music");

module.exports = {
  name: "next",
  description: "Pasa a la sigueinte cancion",
  run: async (client, interaction) => {
    const mvc = interaction.member.voice.channel.id;
    const pvc = getVoiceConnection(interaction.guild.id);

    if (!pvc) return interaction.reply("No se esta reproduciendo musica");

    if (mvc != pvc.joinConfig.channelId) {
      return interaction.reply("Tienes que estar en el mismo canal de voz");
    }

    const player = getVoiceConnection(interaction.guild.id).state.subscription
      .player;

    nextSong(
      interaction.guild.id,
      player.state.resource.metadata.key,
      interaction,
      player,
      pvc,
      "cmd"
    );
  },
};
