module.exports = {
  name: "reglas",
  aliases: ["rules"],
  description: "Muestra las reglas y da rol",
  async execute(client, message, args, discord) {
    //% BUTTONS
    const btn1 = new discord.MessageButton()
      .setCustomId("acp")
      .setLabel("Acepto")
      .setStyle("SUCCESS");
    const btn2 = new discord.MessageButton()
      .setCustomId("deg")
      .setLabel("No Acepto")
      .setStyle("DANGER");
    //% BUTTONS

    //& FILA

    const fila = new discord.MessageActionRow().addComponents(btn1, btn2);

    //& FILA

    //# MENSAJES

    const msgE = {
      title: "Reglas",
      description: "Estas son las reglas de tu canal",
      color: 65535,
      author: {
        name: "servidor",
        icon_url: "https://i.imgur.com/H37kxPH.jpeg",
      },
    };

    //# MENSAJES

    message.channel.send({ embeds: [msgE], components: [fila] });
  },
};
