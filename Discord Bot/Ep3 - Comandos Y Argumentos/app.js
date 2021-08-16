const { Client, Intents } = require("discord.js");

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

client.on("messageCreate", (msg) => {
  if (msg.author.bot) return;

  if (!msg.content.startsWith(prefix))
    return msg.reply("Esto no es un comando");

  if (msg.content.startsWith(prefix)) {
    const argumentos = msg.content.slice(prefix.length).split(/ +/);
    const comando = argumentos.shift().toLowerCase();

    if (comando == "ping") return msg.reply("pong");

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
