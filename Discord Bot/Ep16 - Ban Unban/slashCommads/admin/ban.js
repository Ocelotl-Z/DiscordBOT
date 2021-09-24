module.exports = {
  name: "ban",
  description: "Banea a un usuario",
  options: [
    {
      name: "usuario",
      description: "usuario a banear",
      type: "USER",
      required: "true",
    },
    {
      name: "razon",
      description: "razon del baneo",
      type: "STRING",
      required: "true",
    },
  ],
  permissions: ["BAN_MEMBERS"],
  run: async (client, interaction) => {
    //Id del canal logs 890778271711637575
    let channel = interaction.guild.channels.cache.find(
      (c) => c.id == "890778271711637575"
    );

    let user = interaction.options.getMember("usuario");
    let razon = interaction.options.getString("razon");
    let fecha = parseInt(interaction.createdTimestamp / 1000);

    //Embed como objeto

    const emb = {
      author: {
        name: "BANEOS EXPRESS",
        icon_url:
          "https://cdn3.iconfinder.com/data/icons/pyconic-icons-2-1/512/ban-512.png",
      },
      title: `${user.user.username}`,
      description: `Razon de baneo: ${razon}\n <t:${fecha}:F>\n Id: ||${user.user.id}||`,
      timestamp: interaction.createdTimestamp,
      color: 16711680,
    };

    try {
      channel.send({ embeds: [emb] });

      if (!user.user.bot) {
        user.send({ embeds: [emb] });
      }
      user.ban();
      return interaction.reply({
        content: `Baneo Exitoso ID: ||${user.user.id}||`,
        ephemeral: true,
      });
    } catch (error) {
      console.log(error);
      return interaction.reply({
        content: `Baneo Fallido ID: ||${user.user.id}||`,
        ephemeral: true,
      });
    }
  },
};
