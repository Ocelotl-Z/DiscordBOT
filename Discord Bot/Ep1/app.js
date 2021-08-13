const { Client, Intents } = require("discord.js");

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

// CODIGO

client.once("ready", (bot) => {
  console.log(`Bot: ${bot.user.username}\nStatus: ${bot.presence.status}`);
});

//------

client.login("DISCORD TOKEN");
