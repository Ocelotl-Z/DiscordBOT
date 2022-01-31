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
  description: "Reproducir musica",
  async execute(client, message, args, discord) {
    //# Canal de voz del usuario
    let vc = message.member.voice.channel;

    //# Comprobaciones
    if (args.length < 1) {
      return message.channel.send("Tienes que indicar el nombre de la cancion");
    }

    if (!vc) {
      return message.channel.send("Tienes que estar en un canal de voz");
    }

    //# Busqueda de video
    let ytInfo = await play.search(args.join(" "));
    let stream = await play.stream(ytInfo[0].url);

    //% Agregar cancion a lista re produccion
    const song = { key: uuidv4(), title: ytInfo[0].title, url: ytInfo[0].url };
    agregar(message.guild.id, song);

    //& Comprobar que no se este reproduciendo musica
    const pvc = getVoiceConnection(message.guild.id);
    if (pvc)
      return message.reply({
        embeds: [
          queueEmbed(ytInfo[0].title, ytInfo[0].url, ytInfo[0].thumbnail.url),
        ],
      });

    //# Conexion
    const connection = joinVoiceChannel({
      channelId: vc.id,
      guildId: message.guildId,
      adapterCreator: message.guild.voiceAdapterCreator,
    });

    //% Metadata para saber cancion reproducida
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
    message.reply({
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
        queue.get(message.guild.id).songs.length <= 1 &&
        queue.get(message.guild.id).loop == "false"
      ) {
        connection.destroy();
        queue.delete(guildId);
        return message.channel.send("Sin canciones por reproducir");
      } else {
        return nextSong(
          message.guild.id,
          oldS.resource.metadata.key,
          message,
          player,
          connection,
          "auto"
        );
      }
    });
  },
};
