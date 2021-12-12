const { eliminar } = require("../../global/music");

module.exports = {
  name: "delsong",
  description: "Elimina una cancion de la lista",
  options: [
    {
      name: `titulo`,
      description: `titulo de la cancion`,
      type: "STRING",
      required: "true",
    },
  ],
  run: async (client, interaction) => {
    const res = eliminar(
      interaction.options.getString("titulo"),
      interaction.guild.id
    );
    const embed = {
      author: {
        name: "OCELOTL MUSIC",
        icon_url:
          "https://png.pngtree.com/png-vector/20190830/ourlarge/pngtree-music-icon-design-vector-png-image_1714137.jpg",
      },
      title: `${res.msg}`,
      description: `Cancion: **${res.title}**`,
      color: "RED",
    };

    console.log(res.title);

    interaction.reply({ embeds: [embed] });
  },
};
