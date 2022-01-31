module.exports = {
  name: "unmute",
  description: "Desmutea a un usuario",
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
  permissions: ["MUTE_MEMBERS"],
  run: async (client, interaction) => {
    //ID ROL MUTE 893210223551086602
    //ID DE LOGS 893213236801974282

    let channel = interaction.guild.channels.cache.find(
      (c) => c.id == "893213236801974282"
    );

    let objetivo = interaction.options.getMember("usuario");
    let razon = interaction.options.getString("razon");
    let fecha = parseInt(interaction.createdTimestamp / 1000);

    //Embed como objeto
    const emb = {
      author: {
        name: "DESMUTEOS EXPRESS",
        icon_url: "https://i.dlpng.com/static/png/6431269_preview.png",
      },
      title: `${objetivo.user.username}`,
      description: `Desmuteado por: ${interaction.user.username}\n Razon del desmuteo: ${razon}\n<t:${fecha}:F>\nId: ||${objetivo.user.id}||`,
      timestamp: interaction.createdTimestamp,
      color: 16711680,
    };

    try {
      objetivo.roles.remove("893210223551086602"); //Agrega el rol mute

      interaction.reply({
        content: `Usuario desmuteado con exito, checar los logs`,
        ephemeral: true,
      }); // Mensaje de aprobacion

      channel.send({ embeds: [emb] }); // Embed al canal de logs

      if (objetivo.user.bot) return; //Checar si es bot
      objetivo.send({ embeds: [emb] }); // Embed al usuario muteado
    } catch (e) {
      interaction.reply({
        content: `Error al desmuteado al usuario: ${objetivo.user.username} con el id: ||${objetivo.user.id}||`,
        ephemeral: true,
      }); //Emsaje de erro
      console.log("Error desmuteado: " + e);
    }
  },
};
