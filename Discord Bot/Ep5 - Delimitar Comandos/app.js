const { Client, Intents, MessageEmbed } = require("discord.js");

require("dotenv").config();

const prefix = process.env.PREFIX;

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

// CODIGO

client.once("ready", () => {
  console.log("***********************************************************");

  console.log(`Bot: ${client.user.username}`);

  client.user.setStatus("online");
  client.user.setActivity("Bot #1", { type: "WATCHING" }); //Compitiendo en Bot#1

  console.log(
    "***********************************************************\n\n"
  );
  console.log(
    "***************************  CONSOLE LOGS  ********************************"
  );
});

client.on("messageCreate", (msg) => {
  if (msg.author.bot) return;

  if (!msg.content.startsWith(prefix))
    return msg.reply("Esto no es un comando");

  if (msg.content.startsWith(prefix)) {
    const argumentos = msg.content.slice(prefix.length).split(/ +/);
    const comando = argumentos.shift().toLowerCase();

    if (msg.channelId == "877695385857040454" || msg.channel.name == "ep-5") {
      if (comando == "reg") {
        msg.reply("registrado");
      }
    }

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
