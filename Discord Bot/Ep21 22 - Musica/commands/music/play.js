const play = require("play-dl");

const {
  createAudioPlayer,
  createAudioResource,
  joinVoiceChannel,
} = require("@discordjs/voice");

module.exports = {
  name: "play",
  description: "Reproducir musica",
  async execute(client, message, args, discord) {
    //# Canal de voz
    let vc = message.member.voice.channel;
    //# Comprobaciones
    if (args.length < 1) {
      return message.channel.send("Tienes que indicar el nombre de la cancion");
    }

    if (!vc) {
      return message.channel.send("Tienes que estar en un canal de voz");
    }

    let ytInfo = await play.search(args.join(" "));
    let stream = await play.stream(ytInfo[0].url);

    const embed = {
      author: {
        name: "OCELOTL MUSIC",
        icon_url:
          "https://png.pngtree.com/png-vector/20190830/ourlarge/pngtree-music-icon-design-vector-png-image_1714137.jpg",
      },
      title: ytInfo[0].title,
      description: `${ytInfo[0].description}\n**[LINK](${ytInfo[0].url})**`,
      color: "RED",
      image: { url: ytInfo[0].thumbnail.url },
    };

    const connection = joinVoiceChannel({
      channelId: vc.id,
      guildId: message.guildId,
      adapterCreator: message.guild.voiceAdapterCreator,
    });

    const resource = createAudioResource(stream.stream, {
      inputType: stream.type,
    });
    const player = createAudioPlayer();
    player.play(resource);
    connection.subscribe(player);

    message.reply({ embeds: [embed] });
    player.on("error", (error) => {
      console.error(
        `Error: ${error.message} with resource ${error.resource.metadata.title}`
      );
      player.play(getNextResource());
    });
  },
};
