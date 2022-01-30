module.exports = {
  name: "delsong",
  description: "Elimina una cancion",
  aliases: ["delS", "DS"],
  async execute(client, message, args, discord) {
    const res = eliminar(message.options.getString("titulo"), message.guild.id);

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
    
    message.reply({ embeds: [embed] });
  },
};
