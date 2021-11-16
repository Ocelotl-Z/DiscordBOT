const play = require("play-dl");

const { v4: uuidv4 } = require("uuid");

const {
  queue,
  agregar,
  musicEmbed,
  queueEmbed,
  nextSong,
} = require("../../global/music");

const {
  createAudioPlayer,
  createAudioResource,
  joinVoiceChannel,
  AudioPlayerStatus,
  getVoiceConnection,
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
    //# Canal de voz del usuario
    const vc = interaction.member.voice.channel;
    if (!vc) {
      return interaction.reply({
        content: "Tienes que estar en un canal de voz",
        ephemeral: true,
      });
    }
    //# BUSQUEDA DE VIDEO
    const ytInfo = await play.search(interaction.options.getString("cancion"));
    const stream = await play.stream(ytInfo[0].url);

    //% Agregar cancion a lista re produccion
    const song = { key: uuidv4(), title: ytInfo[0].title, url: ytInfo[0].url };
    agregar(interaction.guild.id, song);

    //& Comprobar que no se este reproduciendo musica
    const pvc = getVoiceConnection(interaction.guild.id);
    if (pvc)
      return interaction.reply({
        embeds: [
          queueEmbed(ytInfo[0].title, ytInfo[0].url, ytInfo[0].thumbnail.url),
        ],
      });

    //& CONEXION

    const connection = joinVoiceChannel({
      channelId: vc.id,
      guildId: interaction.guildId,
      adapterCreator: interaction.guild.voiceAdapterCreator,
    });

    const resource = createAudioResource(stream.stream, {
      inputType: stream.type,
      metadata: {
        title: ytInfo[0].title,
        key: song.key,
      },
    });

    const player = createAudioPlayer();
    player.play(resource);
    connection.subscribe(player);

    //# Respuesta
    interaction.reply({
      embeds: [
        musicEmbed(
          ytInfo[0].title,
          ytInfo[0].description,
          ytInfo[0].url,
          ytInfo[0].thumbnail.url
        ),
      ],
    });

    //# En cuanto se acabe la musica el reproductor se sale
    // console.log(player.state.resource.metadata.key);
    //% oldS = Recaba informacion de la cancion reproducida
    player.on(AudioPlayerStatus.Idle, async (oldS, newS) => {
      if (
        queue.get(interaction.guild.id).songs.length <= 1 &&
        queue.get(interaction.guild.id).loop == false
      ) {
        connection.destroy();
        queue.delete(guildId);
        return;
      } else {
        return nextSong(
          interaction.guild.id,
          oldS.resource.metadata.key,
          interaction,
          player,
          connection,
          "auto"
        );
      }
    });
  },
};
