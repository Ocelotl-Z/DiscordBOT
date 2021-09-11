module.exports = {
  name: "mencion",
  description: "Menciona un rol o usuario",
  options: [
    {
      name: "usuario",
      description: "usuario a mencionar",
      type: "USER",
      required: "false",
    },
    {
      name: "rol",
      description: "rol a mencionar",
      type: "ROLE",
      required: "false",
    },
  ],
  run: async (client, interaction) => {
    try {
      const tipo = interaction.options._hoistedOptions[0].type;

      if (tipo == "USER") {
        const user = interaction.options._hoistedOptions[0].user;
        return interaction.reply({
          content: `Usuario mencionado ${user}`,
          ephemeral: false,
        });
      }
      if (tipo == "ROLE") {
        const role = interaction.options._hoistedOptions[0].role;
        return interaction.reply({
          content: `Rol mencionado ${role}`,
          ephemeral: false,
        });
      }
    } catch (error) {
      return interaction.reply({ content: "Faltan datos" });
      console.log("Error en sc: " + error);
    }
  },
};
