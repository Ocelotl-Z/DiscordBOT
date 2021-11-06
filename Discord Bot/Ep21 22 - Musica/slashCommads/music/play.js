const play = require("play-dl");

const {
  createAudioPlayer,
  createAudioResource,
  joinVoiceChannel,
  AudioPlayerStatus,
} = require("@discordjs/voice");

module.exports = {
  name: "play",
  description: "Reproduce una cancion",
  options: [
    {
      name: "cancion",
      description: "Cancion / Autor y cancion / Autor",
      type: "STRING",
      required: "true",
    },
  ],
  run: async (client, interaction) => {
    const vc = interaction.member.voice.channel;
    if (!vc) {
      return interaction.reply({
        content: "Tienes que estar en un canal de voz",
        ephemeral: true,
      });
    }
    //# BUSQUEDA DE VIDEO
    const vdRepro = await play.search(interaction.options.getString("cancion"));
    //% COMPROBACION
    if (!vdRepro) {
      interaction.reply({
        content: "No se encontraron videos",
        ephemeral: true,
      });
    }
    //& CONEXION

    const stream = await play.stream(vdRepro[0].url);

    const embed = {
      author: {
        name: "OCELOTL MUSIC",
        icon_url:
          "https://png.pngtree.com/png-vector/20190830/ourlarge/pngtree-music-icon-design-vector-png-image_1714137.jpg",
      },
      title: vdRepro[0].title,
      description: `${vdRepro[0].description}\n[LINK](${vdRepro[0].url})`,
      color: "RED",
      image: { url: vdRepro[0].thumbnail.url },
    };

    const conc = joinVoiceChannel({
      channelId: vc.id,
      guildId: interaction.guildId,
      adapterCreator: interaction.guild.voiceAdapterCreator,
    });

    const resource = createAudioResource(stream.stream, {
      inputType: stream.type,
    });

    const player = createAudioPlayer();

    player.play(resource);
    conc.subscribe(player);

    interaction.reply({
      embeds: [embed],
    });

    player.on(AudioPlayerStatus.Idle, () => conc.destroy());
  },
};
