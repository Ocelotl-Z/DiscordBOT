const play = require("play-dl");
const { createAudioResource } = require("@discordjs/voice");
const queue = new Map();

//& Crear Reproductor

const reproducir = async (player, msg, url, key) => {
  if (msg.type == "APPLICATION_COMMAND" && msg.replied == false) {
    msg.deferReply();
  }
  const ytInfo = await play.search(url);
  const stream = await play.stream(ytInfo[0].url);
  const emb = musicEmbed(
    ytInfo[0].title,
    ytInfo[0].description,
    ytInfo[0].url,
    ytInfo[0].thumbnail.url
  );

  if (msg.type == "APPLICATION_COMMAND") {
    msg.followUp({
      embeds: [emb],
    });
  } else {
    msg.reply({
      embeds: [emb],
    });
  }

  const resource = createAudioResource(stream.stream, {
    inputType: stream.type,
    metadata: {
      title: ytInfo[0].title,
      key: key,
    },
  });

  player.play(resource);
};

//& Agrega canciones a la lista
const agregar = (guildId, song) => {
  const srv_queue = queue.get(guildId);

  if (!srv_queue) {
    const queue_const = { loop: false, songs: [] };
    queue.set(guildId, queue_const);
    queue_const.songs.push(song);
  } else {
    srv_queue.songs.push(song);
  }
};

//& Loop
const loopQueue = (guildId) => {
  const srv_queue = queue.get(guildId);
  if (!srv_queue) return "SN";
  srv_queue.loop = !srv_queue.loop;
  return srv_queue.loop;
};

//& Regresa un arreglo de objetos que contiene la informacion de las canciones
const fullQueue = (guildId) => {
  const srv_queue = queue.get(guildId);

  if (!srv_queue) return "Sin Canciones";

  const songs = [];

  srv_queue.songs.forEach((song) => {
    songs.push(`**${song.title}** - **[Link](${song.url})**\n`);
  });

  return songs;
};

//& Elimina caciones de una lista
const eliminar = (title, guildId) => {
  const srv_queue = queue.get(guildId);
  if (!srv_queue) return "Sin Canciones";

  const songTitle = (song) => song.title.includes(title);
  const songIndex = srv_queue.songs.findIndex(songTitle);
  const songFullTitle = srv_queue.songs.find(songTitle);

  if (!songIndex || songIndex == -1)
    return { msg: "No se encontro la cancion", title: title };
  srv_queue.songs.splice(songIndex, 1);

  return { msg: "Cancion eliminada", title: songFullTitle.title };
};

//% EMBED Musica en reproduccion
const musicEmbed = (title, desc, link, image) => {
  return {
    author: {
      name: "OCELOTL MUSIC",
      icon_url:
        "https://png.pngtree.com/png-vector/20190830/ourlarge/pngtree-music-icon-design-vector-png-image_1714137.jpg",
    },
    title: title,
    description: `${desc}\n**[LINK](${link})**`,
    color: "RED",
    image: { url: image },
  };
};

//% EMBED QUEUE
const queueEmbed = (title, link, image) => {
  return {
    author: {
      name: "OCELOTL MUSIC",
      icon_url:
        "https://png.pngtree.com/png-vector/20190830/ourlarge/pngtree-music-icon-design-vector-png-image_1714137.jpg",
    },
    title: "Queue Atualizada",
    description: `**Cancion agregadar a la lista de reproduccion.**\n\nTitulo: **${title}**\n**[LINK](${link})**`,
    color: "RED",
    thumbnail: { url: image },
  };
};

//# Cancion Sigueinte
const nextSong = async (guildId, key, msg, player, connection, type) => {
  const queue_songs = queue.get(guildId);

  const songKey = (song) => song.key == key;
  const nextIndex = queue_songs.songs.findIndex(songKey) + 1;

  if (!queue_songs.songs[nextIndex]) {
    if (type === "auto" && queue_songs.loop) {
      reproducir(
        player,
        msg,
        queue_songs.songs[0].url,
        queue_songs.songs[0].key
      );
      if (msg.type == "APPLICATION_COMMAND") {
        return msg.followUp("Reiniciando las canciones");
      } else {
        return msg.channel.send("Reiniciando las canciones");
      }
    } else if (type === "auto") {
      connection.destroy();
      queue.delete(guildId);
      return msg.reply("Sin canciones por reproducir\nQueue limpia");
    }
    return msg.reply("No tenemos mas canciones");
  }

  reproducir(
    player,
    msg,
    queue_songs.songs[nextIndex].url,
    queue_songs.songs[nextIndex].key
  );
};

//# Cancion Anterior
const previousSong = async (guildId, key, msg, player, connection) => {
  const queue_songs = queue.get(guildId);
  const songKey = (song) => song.key == key;

  const previousIndex = queue_songs.songs.findIndex(songKey) - 1;

  if (!queue_songs.songs[previousIndex]) {
    return msg.reply("No existen canciones previas a esta");
  }

  reproducir(
    player,
    msg,
    queue_songs.songs[previousIndex].url,
    queue_songs.songs[previousIndex].key
  );
};

module.exports = {
  queue,
  agregar,
  eliminar,
  fullQueue,
  musicEmbed,
  queueEmbed,
  nextSong,
  previousSong,
  loopQueue,
};
