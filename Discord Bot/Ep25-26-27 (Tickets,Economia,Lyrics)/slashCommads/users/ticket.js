module.exports = {
  name: "ticket",
  description: "Crea un ticket",
  options: [
    {
      name: `razon`,
      description: `Razon de tu ticket`,
      type: "STRING",
      required: true,
    },
  ],
  run: async (client, interaction) => {
    //# Ticket Antigual
    const tkA = interaction.guild.channels.cache.find(
      (c) => c.topic == interaction.user.id
    );

    if (tkA) {
      return interaction.reply({
        content: " Ya existe un ticket con tu nombre",
        ephemeral: true,
      });
    }

    //# Categoria Antigua
    let tkC = interaction.guild.channels.cache.find((c) => c.name == "TICKETS");

    if (!tkC) {
      await interaction.guild.channels
        .create("TICKETS", {
          type: 4,
        })
        .then((c) => {
          tkC = c;
        })
        .catch(console.error);
    }

    //# Razon
    const razon = interaction.options.getString("razon");

    //% EMBED
    const embed = {
      author: { name: "Ticket" },
      title: interaction.user.username,
      description: `Has solicitado un ticket por la siguiente razon:\n ***${razon}***`,
      color: 12390624,
    };

    //# Rol
    const every = interaction.guild.roles.cache.find(
      (r) => r.name == "@everyone"
    );

    //#Crear Ticket
    await interaction.guild.channels
      .create(interaction.user.username, {
        //& Tipo de canal
        type: 0,

        //& El tema del canal
        topic: interaction.user.id,

        //& Parent
        parent: tkC.id,

        //& Permisos
        permissionOverwrites: [
          {
            id: every.id,
            deny: ["VIEW_CHANNEL", "SEND_MESSAGES", "READ_MESSAGE_HISTORY"],
          },
          {
            id: interaction.user.id,
            allow: ["VIEW_CHANNEL", "SEND_MESSAGES", "READ_MESSAGE_HISTORY"],
          },
        ],
      })
      .then((c) => {
        c.send({ embeds: [embed] });
        interaction.reply({
          content: "Ticket creado correctamente",
          ephemeral: true,
        });
      })
      .catch(console.error);
  },
};
