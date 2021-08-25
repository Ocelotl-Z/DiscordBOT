const discord = require("discord.js");

require("dotenv").config();

const prefix = process.env.PREFIX;

const client = new discord.Client({
  intents: ["GUILDS", "GUILD_MESSAGES"],
});

// CODIGO

//SlashCommand

let Scommad = [
  {
    name: "ping",
    description: "Devuelve el ping de el bot",
    run: async (client, interaction, args) => {
      await interaction.followUp({ content: `Ping: ${client.ws.ping} ms` });
    },
  },
  {
    name: "hola",
    description: "Devuelve un saludo",
    run: async (client, interaction, args) => {
      await interaction.followUp({ content: "Hola como estas?" });
    },
  },
];

client.slash = new discord.Collection();

client.once("ready", async () => {
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

  client.slash.set(Scommad[0].name, Scommad[0]);
  client.slash.set(Scommad[1].name, Scommad[1]);

  await client.application.commands.set(Scommad);
});

client.on("interactionCreate", async (interaction) => {
  if (interaction.isCommand()) {
    await interaction.deferReply({ ephemeral: false }).catch((obj) => {
      console.log(obj);
    });

    console.log(client.slash.get(interaction.commandName));

    const command = client.slash.get(interaction.commandName);

    if (!command)
      return interaction.followUp({ content: "Comando no registrado" });

    const args = [];

    try {
      command.run(client, interaction, args);
    } catch (error) {
      console.log(error);
    }
  }
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
