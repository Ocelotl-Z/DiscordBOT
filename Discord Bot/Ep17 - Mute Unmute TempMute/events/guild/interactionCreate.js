const path = require("path");

module.exports = async (client, discord, interaction) => {
  //%BUTTONS
  if (interaction.isButton()) {
    interaction.deferReply({ ephemeral: true });

    const member = interaction.member;

    if (interaction.customId === "acp") {
      let rol = "882094521196896327";
      member.roles.add(rol);
      return console.log("Acepto");
    }
    if (interaction.customId === "deg") {
      member.kick();
      return console.log("No Acepto");
    }
  }
  //%BUTTONS

  //# COMMANDS

  //Embed como objeto
  const emb = {
    author: {
      name: "Necesitas permisos",
      icon_url: "https://cdn-icons-png.flaticon.com/512/1633/1633103.png",
    },
    timestamp: interaction.createdTimestamp,
    color: 16711680,
  };

  if (interaction.isCommand()) {
    const command = client.slash.get(interaction.commandName);

    if (!interaction.member.permissions.has(command.permissions || [])) {
      return interaction.reply({ embeds: [emb], ephemeral: true });
    }

    try {
      command.run(client, interaction);
    } catch (error) {
      console.log("Error iC: " + error);
    }
  }
  //# COMMANDS

  const embed = {
    title: "Embed Objeto",
    color: 65535,
    description: "Hola soy un embed",
    author: {
      name: "OLA",
      url: "http://www.google.com",
      icon_url: "attachment://img.png",
    },
    image: { url: "attachment://img.png" },
  };
  //& MENU
  if (interaction.isSelectMenu()) {
    if (interaction.customId == "menu1") {
      interaction.deferReply({ ephemeral: false });

      const at = new discord.MessageAttachment(
        path.join(__dirname, "../../src", "bg3.png"),
        "img.png"
      );

      switch (interaction.values[0]) {
        case "dog":
          interaction.followUp({
            content: "Elegiste perros",
            embeds: [embed],
            files: [at],
          });
          break;
        case "cat":
          interaction.followUp({ content: "Elegiste gatos" });
          break;
        case "ing":
          interaction.followUp({ content: "Elegiste Iguanas" });
          break;

        default:
          interaction.followUp({ content: "Error" });
          break;
      }
    }
  }
  //& MENU
};
