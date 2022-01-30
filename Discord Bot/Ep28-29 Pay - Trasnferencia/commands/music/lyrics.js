const { getLyrics, getSong } = require("genius-lyrics-api");
require("dotenv").config();

const { getVoiceConnection } = require("@discordjs/voice");

module.exports = {
  name: "lyrics",
  description: "Lirica de una cancion",
  aliases: ["ly"],
  async execute(client, message, args, discord) {
    const pvc = getVoiceConnection(message.guild.id);
    if (!pvc) return message.reply("No se esta reproduciendo musica");

    //# Titulo de la cancion actual
    const playerInfo = getVoiceConnection(message.guild.id).state.subscription
      .player.state.resource.metadata.title;

    //# Artista - Cancion (Texto)
    //% [ "Artista","Cancion (Texto)" ]
    const songInfo = playerInfo.split(" - ");

    const options = {
      apiKey: process.env.GENIUS,
      title: songInfo[1].split("(")[0],
      artist: songInfo[0],
      optimizeQuery: true,
    };

    const lyric = await getLyrics(options);
    const song = await getSong(options);

    const embed = {
      author: { name: "Liricas" },
      title: song.title,
      description: lyric + `\n*** [LINK](${song.url}) ***`,
      thumbnail: { url: song.albumArt },
    };

    message.reply({ embeds: [embed] });
  },
};
