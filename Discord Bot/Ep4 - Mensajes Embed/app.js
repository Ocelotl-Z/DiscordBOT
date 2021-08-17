const { Client, Intents, MessageEmbed } = require("discord.js");

require("dotenv").config();

const prefix = "^";

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

// CODIGO

client.once("ready", (bot) => {
  console.log("***********************************************************");
  console.log(`Bot: ${bot.user.username}\nStatus: ${bot.presence.status}`);
  console.log(
    "***********************************************************\n\n"
  );
  console.log(
    "***************************  CONSOLE LOGS  ********************************"
  );
});

//Mensaje EMbed

//Colores RGB/HEX/NOMBRE  R G B [0,255,255]  RED GREEN BLUE

const me = new MessageEmbed()
  .setColor("GOLD")
  .setTitle("Pong")
  .setURL("https://www.google.com")
  .setAuthor(
    "HOLA" /*Autor*/,
    "https://i.imgur.com/H37kxPH.jpeg" /* Icono*/,
    "https://discord.com" /* URL */
  )
  .setDescription("Este es el contenido principal")
  .setThumbnail("https://i.imgur.com/H37kxPH.jpeg")
  .addFields(
    {
      name: "Contenido 1",
      value: "Este es el avlor del contenido 1",
    },
    {
      name: "Col1",
      value: "Columna 1 descripcion",
      inline: true,
    },
    {
      name: "Col2",
      value: "Columna 2 descripcion",
      inline: true,
    }
  )
  .setImage("https://i.imgur.com/H37kxPH.jpeg")
  .setTimestamp()
  .setFooter("Ocelotl-Z", "https://i.imgur.com/H37kxPH.jpeg");

client.on("messageCreate", (msg) => {
  if (msg.author.bot) return;

  if (!msg.content.startsWith(prefix))
    return msg.reply("Esto no es un comando");

  if (msg.content.startsWith(prefix)) {
    const argumentos = msg.content.slice(prefix.length).split(/ +/);
    const comando = argumentos.shift().toLowerCase();

    const me2 = new MessageEmbed()
      .setColor("RED")
      .setTitle(comando.toUpperCase())
      .setAuthor(msg.author.username, msg.author.displayAvatarURL())
      .setDescription(`El comando elegido es ${comando}`);

    msg.channel.send({ embeds: [me2] });

    if (comando == "ping") return msg.reply("PONG");

    if (comando == "suma") {
      return msg.reply(
        `El resultado es: ${
          parseFloat(argumentos[0]) + parseFloat(argumentos[1])
        }`
      );
    }
  }
});

//------

client.login(process.env.DSTOKEN);
