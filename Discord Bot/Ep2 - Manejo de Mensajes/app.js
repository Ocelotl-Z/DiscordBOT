const { Client, Intents } = require("discord.js");

require("dotenv").config();

const prefix = "^";

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

// CODIGO

client.once("ready", (bot) => {
  console.log(`Bot: ${bot.user.username}\nStatus: ${bot.presence.status}`);
});

client.on("messageCreate", (msg) => {
  if (msg.author.bot)
    return console.log(`Mensaje del Bot: ${msg.author.username}`);

  if (msg.content.startsWith(prefix))
    return msg.reply(`Este es un comando del prefijo ${prefix}`);

  msg.reply("Esto no es un comando");
});

//------

client.login(process.env.DSTOKEN);
