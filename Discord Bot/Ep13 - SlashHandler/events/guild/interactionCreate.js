module.exports = (client, discord, interaction) => {
  //%BUTTONS

  if (interaction.isButton()) {
    interaction.deferReply({ ephemeral: true });
    interaction.followUp({ content: "Hola" });

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
};
