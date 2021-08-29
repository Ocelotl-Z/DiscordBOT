module.exports = async (client, discord, member) => {
  const channel = member.guild.channels.cache.find(
    (channel) => channel.id === "880615785985347674"
  );

  const me = new discord.MessageEmbed()
    .setColor("RED")
    .setTitle("Bienvendia")
    .setAuthor(
      member.user.username /*Autor*/,
      member.user.displayAvatarURL() /* Icono*/
    )
    .setDescription(`Se bienvendio al servidor ${member.guild.name}`)
    .setThumbnail("https://i.imgur.com/H37kxPH.jpeg")
    .setTimestamp()
    .setFooter(member.guild.name, "https://i.imgur.com/H37kxPH.jpeg");

  channel.send({ embeds: [me] });
};
