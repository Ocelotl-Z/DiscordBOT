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
  if (interaction.isCommand()) {
    const command = client.slash.get(interaction.commandName);
    try {
      command.run(client, interaction);
    } catch (error) {
      console.log("Error iC: " + error);
    }
  }
  //# COMMANDS

  //& MENU
  if (interaction.isSelectMenu()) {
    if (interaction.customId == "menu1") {
      interaction.deferReply({ ephemeral: false });

      switch (interaction.values[0]) {
        case "dog":
          interaction.followUp({ content: "Elegiste perros" });
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
