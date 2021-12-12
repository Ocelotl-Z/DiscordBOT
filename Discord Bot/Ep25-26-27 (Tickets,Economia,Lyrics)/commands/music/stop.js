const { getVoiceConnection } = require("@discordjs/voice");
const { queue } = require("../../global/music");
module.exports = {
  name: "stop",
  description: "Para y desconecta el bot de musica",
  async execute(client, message, args, discord) {
    const mvc = message.member.voice.channel.id;
    const pvc = getVoiceConnection(message.guild.id);

    if (!pvc) return message.reply("No se esta reproduciendo musica");

    if (mvc != pvc.joinConfig.channelId) {
      return message.reply("Tienes que estar en el mismo canal de voz");
    }

    const player = getVoiceConnection(message.guild.id).state.subscription
      .player;

    queue.delete(message.guild.id);

    player.stop();
    pvc.destroy();
  },
};
