module.exports = {
  name: "unban",
  description: "Desbanea a un usuario",
  options: [
    {
      name: "id",
      description: "id del usuari a desbanear",
      type: "STRING",
      required: "true",
    },
  ],
  permissions: ["BAN_MEMBERS"],
  run: async (client, interaction) => {
    let channel = interaction.guild.channels.cache.find(
      (c) => c.id == "890778271711637575"
    );

    let id = interaction.options.getString("id");
    let fecha = parseInt(interaction.createdTimestamp / 1000);

    //Embed como objeto

    const emb = {
      author: {
        name: "DESBANEOS EXPRESS",
        icon_url: "https://cdn-icons-png.flaticon.com/512/1633/1633103.png",
      },
      title: "Desbaneo",
      description: `<t:${fecha}:F>\n Id: ||${id}||`,
      timestamp: interaction.createdTimestamp,
      color: 65280,
    };

    try {
      interaction.guild.members.unban(id);

      channel.send({ embeds: [emb] });

      return interaction.reply({
        content: `Desbaneo Exitoso ||${id}||`,
        ephemeral: true,
      });
    } catch (error) {
      console.log(error);
      return interaction.reply({
        content: `Desbaneo Fallido ||${id}||`,
        ephemeral: true,
      });
    }
  },
};
